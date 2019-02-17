pragma solidity ^0.5.0;
import './Portfolio.sol';

contract PortfolioFactory {
  
  event NewContract (
    address deployedAt,
    address platform,
    address adminAddress,
    string adminName
  );

  // create contract
  function createPortfolio(
    address platform,
    address  adminAddress,
    string memory adminName
  ) public {

    Portfolio newPortfolio = new Portfolio(
      platform,
      adminAddress,
      adminName
    );
    
    emit NewContract(address(newPortfolio), platform,
      adminAddress,
      adminName);
  }

}