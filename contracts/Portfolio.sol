pragma solidity ^0.5.0;

contract Portfolio {
  address public platform;

  event ShareUpdated(
    address memberAddress,
    uint256 newShareCount
  );
  
  
  // Member management
  uint public totalShares = 0;
  address public adminMember;
  struct Member {
    string name;
    address memberAddress;
    uint shares;
    uint256 index;
    bool valid;
  }
  mapping (address => Member) public memberMap;
  Member[] public memberArray;      
  event RegisterMember(
    string name,
    address memberAddress
      
  );
  event UnregisterMember(
    address memberAddress
  );
  event DepositByMember(
    address memberAddress
  );
  
  
  constructor(address _platform, address _adminMember, string memory _adminName) public {
    
    platform = _platform;
    adminMember = _adminMember;

    // add admin as member
    memberMap[_adminMember] = Member(_adminName, _adminMember,0, memberArray.length, true);
    memberArray.push(memberMap[_adminMember]);
  }


  function ethBalance() public view returns(uint256 balance){
    return address(this).balance;
  }
  

  // -------
  // Member
  // -------
  
  function memberRegister(string memory _name, address _memberAddress) public returns (bool registered){

    // only admin
    require(msg.sender == adminMember);
        
    // member does not exist
    require(!memberMap[_memberAddress].valid);

    memberMap[_memberAddress] = Member(_name, _memberAddress,0, memberArray.length, true);
    memberArray.push(memberMap[_memberAddress]);

    emit RegisterMember(_name, _memberAddress);

    return memberMap[_memberAddress].valid;
}

  function memberUnregister(address _memberAddress) public returns (bool registered){

    // only admin
    require(msg.sender == adminMember);

    // set valid to false
    memberMap[_memberAddress].valid = false;
    memberArray[memberMap[_memberAddress].index].valid = false;

    emit UnregisterMember(memberMap[_memberAddress].memberAddress);
    
    return memberMap[_memberAddress].valid;
  }

  function memberDeposit() public payable returns (bool registered){

    // only member
    require(memberMap[msg.sender].valid);

    // set valid to false
    memberMap[msg.sender].shares = msg.value;
    memberArray[memberMap[msg.sender].index].shares = msg.value;

    // update total shares
    totalShares += msg.value;

    emit DepositByMember(memberMap[msg.sender].memberAddress);    
    return memberMap[msg.sender].valid;
  }

  function memberShare() public view returns(uint256 balance){
    return (address(this).balance * memberMap[msg.sender].shares) / totalShares;
  }

  function memberWithdrawl(uint256 _shares) public returns (uint256 endBalance){

    // only member
    require(memberMap[msg.sender].valid);

    // has enough shares
    require(memberMap[msg.sender].shares >= _shares);

    // decrease shares
    memberMap[msg.sender].shares = memberMap[msg.sender].shares - _shares;

    // refund  
    msg.sender.transfer(_shares);

    return memberMap[msg.sender].shares;
  }

  
  // -------
  // Platform
  // -------

  // Do this on tournament start...
  function increaseTotalShares(uint _newShares) public returns (uint shareCount){

    // platform only
    require(msg.sender == platform);

    // update total
    totalShares += _newShares;

    emit ShareUpdated(msg.sender, _newShares);
    return totalShares;
  }

  // Do this on tournament end...
  function increaseMemberShares(address _member, uint256 _newShares) public returns (uint shareCount){

    // platform only
    require(msg.sender == platform);

    // update member
    memberMap[_member].shares = _newShares;
    memberArray[memberMap[_member].index].shares = _newShares;

    emit ShareUpdated(_member, _newShares);
    return memberMap[_member].shares;
  }


  // -------
  // Admin
  // -------

  // from Austin Griffith's bouncer proxy
  uint256 public tradeNonce;
  event TradeExecuted (address destination, uint value, bytes data);
  
  function executeTrade(bytes memory sig, address signer, address destination, uint value, bytes memory data) public {

    //the hash contains all of the information about the meta transaction to be called
    bytes32 _hash = getHash(signer, destination, value, data);

    //increment the hash so this tx can't run again
    tradeNonce++;

    // only members...  
    require(signerIsMember(_hash,sig),"BouncerProxy::forward Signer is not whitelisted");


    //execute the transaction with all the given parameters
    require(executeCall(destination, value, data));
    emit TradeExecuted(destination, value, data);
  }

  function getHash(address signer, address destination, uint value, bytes memory data) public view returns(bytes32){
    return keccak256(abi.encodePacked(address(this), signer, destination, value, data, tradeNonce));
  }

  function executeCall(address to, uint256 value, bytes  memory data) internal returns (bool success) {
    assembly {
       success := call(gas, to, value, add(data, 0x20), mload(data), 0, 0)
    }
  }

  function signerIsMember(bytes32 _hash, bytes  memory _signature) internal view returns (bool){
    bytes32 r;
    bytes32 s;
    uint8 v;
    // Check the signature length
    if (_signature.length != 65) {
      return false;
    }
    // Divide the signature in r, s and v variables
    // ecrecover takes the signature parameters, and the only way to get them
    // currently is to use assembly.
    // solium-disable-next-line security/no-inline-assembly
    assembly {
      r := mload(add(_signature, 32))
      s := mload(add(_signature, 64))
      v := byte(0, mload(add(_signature, 96)))
    }
    // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
    if (v < 27) {
      v += 27;
    }
    // If the version is correct return the signer address
    if (v != 27 && v != 28) {
      return false;
    } else {
      // solium-disable-next-line arg-overflow
      return 
        memberMap[ecrecover(keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)
      ), v, r, s)].valid;
    }
  }
  
}