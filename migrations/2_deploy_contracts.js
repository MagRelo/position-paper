var SimpleStorage = artifacts.require('./SimpleStorage.sol');

var Portfolio = artifacts.require('./Portfolio.sol');
var PortfolioFactory = artifacts.require('./PortfolioFactory.sol');

const serverAccount = '0xfd9C0d0Dc50C1d0a0304eBB65a9f23da9693Ce1d';
const adminAddress = '0x863afa452F38966b54Cb1149D934e34670D0683a';

module.exports = function(deployer) {
  deployer.deploy(Portfolio, serverAccount, adminAddress, 'Admin');

  deployer.deploy(SimpleStorage);
};
