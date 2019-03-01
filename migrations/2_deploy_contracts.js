var SimpleStorage = artifacts.require('./SimpleStorage.sol');

var Portfolio = artifacts.require('./Portfolio.sol');
var PortfolioFactory = artifacts.require('./PortfolioFactory.sol');
var TestToken = artifacts.require('./TestToken.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);

  deployer.deploy(PortfolioFactory);

  deployer.deploy(TestToken, 'Name!');
};
