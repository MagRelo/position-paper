pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract TestToken is ERC20 {

  string name;
  constructor(string memory _name) public {    
    name = _name;
  }

  function getName() public view returns(string memory contractName) {
    return name;
  }

  function getBalance() public view returns(uint256 balance) {
    return address(this).balance;
  }

  function mint(address _owner, uint256 _amount) public {
    ERC20._mint(_owner, _amount);
  }

  function buy() payable public {

    // token cost 1ETH
    // require(msg.value > 1000000000000000000);

    ERC20._mint(msg.sender, 1);
  }

}
