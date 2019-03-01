const TestToken = artifacts.require('./TestToken.sol');

contract('TestToken', accounts => {
  let [platform, memberOne, memberTwo, rando] = accounts;

  it('Have a name', async () => {
    const TestTokenInstance = await TestToken.deployed();

    const receipt = await TestTokenInstance.getName({ from: memberOne });

    assert.equal(receipt, 'Name!', 'Incorrect Name');
  });

  it('Have a balance', async () => {
    const TestTokenInstance = await TestToken.deployed();

    const receipt = await TestTokenInstance.getBalance({ from: memberOne });

    assert.equal(receipt, 0, 'Incorrect Balance');
  });

  it('Have a supply', async () => {
    const TestTokenInstance = await TestToken.deployed();

    const receipt = await TestTokenInstance.totalSupply({ from: memberOne });

    assert.equal(receipt, 0, 'Incorrect Supply');
  });

  it('Mint', async () => {
    const TestTokenInstance = await TestToken.deployed();

    // mint new tokens
    const receipt = await TestTokenInstance.mint(memberOne, 10, {
      from: memberOne
    });

    // check supply
    const supply = await TestTokenInstance.totalSupply({ from: memberOne });
    assert.equal(
      supply.toString(10),
      '10',
      'Incorrect Total Supply after mint'
    );

    // check member
    const balance = await TestTokenInstance.balanceOf(memberOne, 10, {
      from: memberOne
    });
    assert.equal(
      balance.toString(10),
      '10',
      'Incorrect Member supply after mint'
    );
  });

  it('Buy', async () => {
    const TestTokenInstance = await TestToken.deployed();

    // buy token
    const receipt = await TestTokenInstance.buy({
      from: memberTwo,
      value: web3.utils.toWei('1')
    });

    // check member
    const tokenBalance = await TestTokenInstance.balanceOf(memberTwo, 1, {
      from: memberTwo
    });

    assert.equal(
      tokenBalance.toString(10),
      '1',
      'Incorrect Member supply after mint'
    );
  });
});
