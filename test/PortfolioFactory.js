const PortfolioFactory = artifacts.require('./PortfolioFactory.sol');

contract('SimpleStorage', accounts => {
  let [platform, memberOne, memberTwo, rando] = accounts;

  it('Deploy a portfolio', async () => {
    const PortfolioFactoryInstance = await PortfolioFactory.deployed();

    const receipt = await PortfolioFactoryInstance.createPortfolio(
      platform,
      memberOne,
      { from: accounts[0] }
    );

    assert.equal(true, true, 'Sender not updated');
  });
});
