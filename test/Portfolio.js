const Portfolio = artifacts.require('./Portfolio.sol');
const SimpleStorage = artifacts.require('./SimpleStorage.sol');

const { soliditySha3 } = require('web3-utils');

let PortfolioInstance;
let SimpleStorageInstance;

contract('Portfolio', accounts => {
  let [platform, foundingMember, memberOne, memberTwo, rando] = accounts;
  const adminName = 'Founder';

  // deploy contract
  beforeEach('setup', async () => {
    PortfolioInstance = await Portfolio.new(platform, foundingMember);
    SimpleStorageInstance = await SimpleStorage.deployed();
  });

  describe('Membership', () => {
    it('Founder is a member', async () => {
      const memberStruct = await PortfolioInstance.memberMap(foundingMember);

      assert.equal(memberStruct[0], foundingMember, 'Founder not member');
    });

    it('Member can add a member', async () => {
      // add
      await PortfolioInstance.memberRegister(memberOne, {
        from: foundingMember
      });

      const memberStruct = await PortfolioInstance.memberMap(memberOne);
      assert.equal(memberStruct[0], memberOne, 'Member 1 not member');
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
      await PortfolioInstance.memberRegister(memberOne, {
        from: foundingMember
      });

      // test add
      const memberStruct = await PortfolioInstance.memberMap(memberOne);
      assert.equal(memberStruct[0], memberOne, 'Member 1 not member');

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
      await PortfolioInstance.memberRegister(memberOne, {
        from: foundingMember
      });

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
      await PortfolioInstance.memberRegister(memberOne, {
        from: foundingMember
      });

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
    it('Members can execute trades', async () => {
      // register member
      await PortfolioInstance.memberRegister(memberOne, {
        from: foundingMember
      });

      // build txn data
      const simpleStorageAddress = SimpleStorageInstance.address;
      const targetContractValue = 0;
      const txnData = buildTxnData();

      // get signing account nonce
      const nonce = await PortfolioInstance.tradeNonce();

      // hash
      const parts = [
        PortfolioInstance.address,
        memberOne,
        simpleStorageAddress,
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
        simpleStorageAddress,
        targetContractValue,
        txnData,
        {
          from: memberOne
        }
      );

      // check simplesignature
      const currentValue = await SimpleStorageInstance.value.call({
        from: platform
      });
      assert.equal(currentValue, 100, 'Value not updated');
      const lastUpdatedBy = await SimpleStorageInstance.lastUpdatedBy.call({
        from: platform
      });

      assert.equal(
        lastUpdatedBy,
        PortfolioInstance.address,
        'Not updated by Portfolio'
      );
    });

    it('Platform *cant* execute trades', async () => {
      // build txn data
      const simpleStorageAddress = SimpleStorageInstance.address;
      const targetContractValue = 0;
      const txnData = buildTxnData();

      // get signing account nonce
      const nonce = await PortfolioInstance.tradeNonce();

      // hash
      const parts = [
        PortfolioInstance.address,
        platform,
        simpleStorageAddress,
        web3.utils.toTwosComplement(targetContractValue),
        txnData,
        web3.utils.toTwosComplement(nonce)
      ];
      // console.log('parts', parts);
      const message = soliditySha3(...parts);

      // sign message
      let signature = await web3.eth.sign(message, platform);

      try {
        // executeTrade(bytes memory sig, address signer, address destination, uint value, bytes memory data)
        await PortfolioInstance.executeTrade(
          signature,
          platform,
          simpleStorageAddress,
          targetContractValue,
          txnData,
          {
            from: platform
          }
        );
      } catch (error) {
        return assert.ok(true);
      }
      assert.equal(true, false, 'Platform executed trade');
    });

    it('Randos *cant* execute trades', async () => {
      // build txn data
      const simpleStorageAddress = SimpleStorageInstance.address;
      const targetContractValue = 0;
      const txnData = buildTxnData();

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

function buildTxnData() {
  // build txn data
  const simpleStorageABI = SimpleStorageInstance.abi;
  const simpleStorageAddress = SimpleStorageInstance.address;
  var destContractInstance = new web3.eth.Contract(
    simpleStorageABI,
    simpleStorageAddress
  );
  return destContractInstance.methods.saveSender(100).encodeABI();
}

function signature() {}
