pragma solidity ^0.5.0;

contract PortfolioFactory {
  
  struct Contract {
    address deployed;
    address adminAddress;
    string adminName;
  }
  mapping (address => Contract) public contractMap; 

  // create contract

}
