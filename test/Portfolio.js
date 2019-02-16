const Portfolio = artifacts.require('./Portfolio.sol');

const { soliditySha3 } = require('web3-utils');

contract('Portfolio', accounts => {
  let [platform, adminAccount, memberOne, memberTwo] = accounts;
  let PortfolioInstance;

  beforeEach('setup', async () => {
    PortfolioInstance = await Portfolio.new(platform, adminAccount, 'Admin');
  });

  it('Admin is a member', async () => {
    const memberStruct = await PortfolioInstance.memberMap(adminAccount);

    assert.equal(memberStruct[0], 'Admin', 'Admin name incorrect');
    assert.equal(memberStruct[1], adminAccount, 'Admin not member');
  });

  it('Admin can add a member', async () => {
    // add
    await PortfolioInstance.memberRegister('Member 1', memberOne, {
      from: adminAccount
    });

    const memberStruct = await PortfolioInstance.memberMap(memberOne);
    assert.equal(memberStruct[0], 'Member 1', 'Member 1 name incorrect');
    assert.equal(memberStruct[1], memberOne, 'Member 1 not member');
  });

  it('Non-admin *cant* add a member', async () => {
    try {
      // add
      await PortfolioInstance.memberRegister('Member Test', memberTwo, {
        from: memberOne
      });
    } catch (error) {
      return assert.ok(true);
    }

    assert.equal(true, false, 'Should have errored');
  });

  it('Member can deposit', async () => {
    // register member
    await PortfolioInstance.memberRegister('Member 1', memberOne, {
      from: adminAccount
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
    await PortfolioInstance.memberRegister('Member 1', memberOne, {
      from: adminAccount
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

  // ---------

  it('Platform can inflate total shares', async () => {
    const totalShares_start = await PortfolioInstance.totalShares({
      from: platform
    });
    const shareIncrease = web3.utils.toWei('5');

    // increase
    await PortfolioInstance.increaseTotalShares(shareIncrease, {
      from: platform
    });

    const totalShares_end = await PortfolioInstance.totalShares({
      from: platform
    });

    assert.equal(
      parseInt(web3.utils.fromWei(shareIncrease), 10) +
        parseInt(web3.utils.fromWei(totalShares_start), 10),
      parseInt(web3.utils.fromWei(totalShares_end), 10),
      'Share total incorrect'
    );
  });

  it('Randos *cant* inflate total shares', async () => {
    try {
      // increase
      await PortfolioInstance.increaseTotalShares(shareIncrease, {
        from: adminAccount
      });
    } catch (error) {
      return assert.ok(true);
    }

    assert.equal(true, false, 'Rando changed share count');
  });

  it('Platform can increase member share', async () => {
    await PortfolioInstance.increaseMemberShares(
      memberOne,
      web3.utils.toWei('1'),
      {
        from: platform
      }
    );

    const memberStruct = await PortfolioInstance.memberMap(memberOne);
    assert.equal(
      web3.utils.fromWei(memberStruct.shares),
      1,
      'Shares incorrect'
    );
  });

  it('Randos *cant* inflate member shares', async () => {
    try {
      await PortfolioInstance.increaseMemberShares(
        memberOne,
        web3.utils.toWei('1'),
        {
          from: adminAccount
        }
      );
    } catch (error) {
      return assert.ok(true);
    }

    assert.equal(true, false, 'Rando changed share count');
  });
});
