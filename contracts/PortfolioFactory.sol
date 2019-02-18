pragma solidity ^0.5.0;
import './Portfolio.sol';

contract PortfolioFactory {
  
  event NewContract (
    address deployedAt,
    address platform,
    address firstMember
  );

  // create contract
  function createPortfolio(
    address platform,
    address  firstMember
  ) public {

    Portfolio newPortfolio = new Portfolio(
      platform,
      firstMember
    );
    
    emit NewContract(address(newPortfolio), platform,
      firstMember);
  }

}