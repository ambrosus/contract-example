pragma solidity ^0.5;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract Owned {
	//address payable private Owner;
	address payable internal Owner;
	constructor() public{
	    Owner = msg.sender;
	}

	function IsOwner(address addr) public view returns(bool)
	{
	    return Owner == addr;
	}

	function TransferOwner(address payable newOwner) public onlyOwner
	{
	    Owner = newOwner;
	}

	function Terminate() public onlyOwner
	{
	    selfdestruct(Owner);
	}

	modifier onlyOwner(){
        require(msg.sender == Owner, 'must be owner');
        _;
  }
}

contract Main is Owned {
  using SafeMath for uint256;

  function exampleMethod1(uint256 v1, uint256 v2) public pure returns (uint256) {
        return v1.add(v2);
  }

  function exampleMethod2(uint256 v1, uint256 v2) public onlyOwner view returns (uint256) {
        return v1.add(v2);
  }
}