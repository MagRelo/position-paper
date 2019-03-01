const Portfolio = artifacts.require('./Portfolio.sol');
const SimpleStorage = artifacts.require('./SimpleStorage.sol');
const TestToken = artifacts.require('./TestToken.sol');

const { soliditySha3 } = require('web3-utils');

let PortfolioInstance;
let SimpleStorageInstance;
let TestTokenInstance;

contract('Portfolio', accounts => {
  let [
    platform,
    foundingMember,
    memberOne,
    memberTwo,
    memberThree,
    memberFour,
    rando
  ] = accounts;

  // deploy contract
  beforeEach('setup', async () => {
    PortfolioInstance = await Portfolio.new(platform, [
      foundingMember,
      memberOne,
      memberTwo
    ]);
    SimpleStorageInstance = await SimpleStorage.deployed();
    TestTokenInstance = await TestToken.deployed();
  });

  describe('Membership', () => {
    it('Founder is a member', async () => {
      const memberStruct = await PortfolioInstance.memberMap(foundingMember);

      assert.equal(memberStruct[0], foundingMember, 'Founder not member');
    });

    it('Member can add a member', async () => {
      // add
      await PortfolioInstance.memberRegister(memberThree, {
        from: foundingMember
      });

      const memberStruct = await PortfolioInstance.memberMap(memberThree);
      assert.equal(memberStruct[0], memberThree, 'Member 3 not member');
    });

    it('Randos *cant* add a member', async () => {
      try {
        // add
        await PortfolioInstance.memberRegister('Member Test', memberTwo, {
          from: rando
        });
      } catch (error) {
        return assert.ok(true);
      }

      assert.equal(true, false, 'Should have errored');
    });

    it('Randos *cant* remove a member', async () => {
      // add
      await PortfolioInstance.memberRegister(memberThree, {
        from: foundingMember
      });

      // test add
      const memberStruct = await PortfolioInstance.memberMap(memberThree);
      assert.equal(memberStruct[0], memberThree, 'Member 3 not member');

      try {
        // remove
        await PortfolioInstance.memberUnregister({
          from: rando
        });
      } catch (error) {
        return assert.ok(true);
      }
      assert.equal(true, false, 'rando removed member');
    });
  });

  describe('Funds', () => {
    it('Member can deposit', async () => {
      // register member
      // await PortfolioInstance.memberRegister(memberOne, {
      //   from: foundingMember
      // });

      // member deposit
      await PortfolioInstance.memberDeposit({
        from: memberOne,
        value: web3.utils.toWei('5')
      });

      const memberStruct = await PortfolioInstance.memberMap(memberOne);
      assert.equal(
        web3.utils.fromWei(memberStruct.shares),
        5,
        'Shares incorrect'
      );
    });

    it('Member can withdraw', async () => {
      // register member
      // await PortfolioInstance.memberRegister(memberOne, {
      //   from: foundingMember
      // });

      // member deposit
      await PortfolioInstance.memberDeposit({
        from: memberOne,
        value: web3.utils.toWei('5')
      });

      // get balance
      const balance_start = web3.utils.fromWei(
        await web3.eth.getBalance(memberOne)
      );

      // withdraw some
      await PortfolioInstance.memberWithdrawl(web3.utils.toWei('2'), {
        from: memberOne
      });

      const balance_end = web3.utils.fromWei(
        await web3.eth.getBalance(memberOne)
      );

      // chack shares
      const memberStruct = await PortfolioInstance.memberMap(memberOne);
      assert.equal(
        web3.utils.fromWei(memberStruct.shares),
        3,
        'Shares incorrect'
      );

      // check balance
      const increased = balance_end > balance_start;
      assert.equal(increased, true, 'balance not increased');
    });
  });

  describe('Trades', () => {
    it('Members can buy ERC20 through portfolio', async () => {
      // fund portfolio
      await PortfolioInstance.memberDeposit({
        from: memberOne,
        value: web3.utils.toWei('5')
      });

      // build txn data
      const targetContractABI = TestTokenInstance.abi;
      const targetContractAddress = TestTokenInstance.address;
      const targetContractValue = 2;
      const txnData = buildTxnData(targetContractABI, targetContractAddress);

      // get signing account nonce
      const nonce = await PortfolioInstance.tradeNonce();

      // hash
      const parts = [
        PortfolioInstance.address,
        memberOne,
        targetContractAddress,
        web3.utils.toTwosComplement(targetContractValue),
        txnData,
        web3.utils.toTwosComplement(nonce)
      ];
      // console.log('parts', parts);
      const message = soliditySha3(...parts);

      // sign message
      let signature = await web3.eth.sign(message, memberOne);

      // executeTrade(bytes memory sig, address signer, address destination, uint value, bytes memory data)
      await PortfolioInstance.executeTrade(
        signature,
        memberOne,
        targetContractAddress,
        targetContractValue,
        txnData,
        {
          from: memberOne
        }
      );

      // check that platform owne a token
      const platformBalance = await TestTokenInstance.balanceOf(
        PortfolioInstance.address,
        {
          from: platform
        }
      );
      assert.equal(
        platformBalance.toString(10),
        '1',
        'Portfolio balance not 1'
      );
    });

    it('Randos *cant* execute trades', async () => {
      // build txn data
      const simpleStorageAddress = SimpleStorageInstance.address;
      const targetContractValue = 0;
      const txnData = buildTxnData(
        SimpleStorageInstance.abi,
        SimpleStorageInstance.address
      );

      // get signing account nonce
      const nonce = await PortfolioInstance.tradeNonce();

      // hash
      const parts = [
        PortfolioInstance.address,
        rando,
        simpleStorageAddress,
        web3.utils.toTwosComplement(targetContractValue),
        txnData,
        web3.utils.toTwosComplement(nonce)
      ];
      // console.log('parts', parts);
      const message = soliditySha3(...parts);

      // sign message
      let signature = await web3.eth.sign(message, rando);

      try {
        // executeTrade(bytes memory sig, address signer, address destination, uint value, bytes memory data)
        await PortfolioInstance.executeTrade(
          signature,
          rando,
          simpleStorageAddress,
          targetContractValue,
          txnData,
          {
            from: rando
          }
        );
      } catch (error) {
        return assert.ok(true);
      }
      assert.equal(true, false, 'Rando executed trade');
    });
  });
});

function buildTxnData(abi, address) {
  var destContractInstance = new web3.eth.Contract(abi, address);
  return destContractInstance.methods.buy().encodeABI();
}
