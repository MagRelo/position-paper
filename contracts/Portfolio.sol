pragma solidity ^0.5.0;

contract Portfolio {
  address public platform;

  event ShareUpdated(
    address memberAddress,
    uint256 newShareCount
  );
  
  
  // Member management
  uint public totalShares = 0;
  struct Member {
    address memberAddress;
    uint shares;
    uint256 index;
    bool valid;
  }
  mapping (address => Member) public memberMap;
  Member[] public memberArray;      
  event RegisterMember(
    address memberAddress
      
  );
  event UnregisterMember(
    address memberAddress
  );
  event DepositByMember(
    address memberAddress
  );
  
  
  constructor(address _platform, address[] memory _members) public {
        
    require(_members.length > 0);
    
    // add members
    for(uint8 i = 0; i < _members.length; i++){      
      memberMap[_members[i]] = Member(_members[i], 0, memberArray.length, true);
      memberArray.push(memberMap[_members[i]]);    
    }

    platform = _platform; // set platformAddress, not currently in use
  }


  function ethBalance() public view returns(uint256 balance){
    return address(this).balance;
  }
  

  // -------
  // Member
  // -------
  
  function memberRegister(address _memberAddress) public returns (bool registered){

    // only member
    require(memberMap[msg.sender].valid);
        
    // member does not exist
    require(!memberMap[_memberAddress].valid);

    memberMap[_memberAddress] = Member(_memberAddress,0, memberArray.length, true);
    memberArray.push(memberMap[_memberAddress]);

    emit RegisterMember(_memberAddress);

    return memberMap[_memberAddress].valid;
}

  function memberUnregister() public returns (bool registered){

    // valid member
    require(memberMap[msg.sender].valid);

    // set valid to false
    memberMap[msg.sender].valid = false;
    memberArray[memberMap[msg.sender].index].valid = false;

    emit UnregisterMember(memberMap[msg.sender].memberAddress);
    
    return memberMap[msg.sender].valid;
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

  // memberVotePremiums()

  
  // -------
  // Platform
  // -------
  // function setParticipationPremiums(uint256[] memory premiums) public returns (bool success){
  //   return true;
  // }
  // function setCurationPremiums(uint256[] memory premiums) public returns (bool success){
  //   return true;
  // }
  // function setPerformancePremiums(uint256[] memory premiums) public returns (bool success){
  //   return true;
  // }

  // -------
  // Members
  // -------
  // function implementParticipationPremiums(uint256[] memory premiums) public returns (bool success){
  //   return true;
  // }
  // function implementCurationPremiums(uint256[] memory premiums) public returns (bool success){
  //   return true;
  // }
  // function implementPerformancePremiums(uint256[] memory premiums) public returns (bool success){
  //   return true;
  // }


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