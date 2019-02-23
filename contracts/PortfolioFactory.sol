pragma solidity ^0.5.0;
import './Portfolio.sol';

contract PortfolioFactory {
  
  event NewContract (
    address deployedAt,
    address platform,
    address[] members
  );

  // create contract
  function createPortfolio(
    address _platform,
    address[] memory _members
  ) public {

    Portfolio newPortfolio = new Portfolio(
      _platform,
      _members
    );
    
    emit NewContract(address(newPortfolio), _platform,
      _members);
  }

}