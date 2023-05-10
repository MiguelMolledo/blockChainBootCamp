// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import this file to use console.log
import 'hardhat/console.sol';

// console.log('Unlock time is %o and block timestamp is %o', unlockTime, block.timestamp);
contract Token {
    // string public name = 'Dapp University';
    // string public symbol = 'DAPP';
    
    // uint256 public totalSupply = 1000000 * (10**decimals);
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(address indexed owner,
	 address indexed spender,
	 uint256 value
	 );
    // Track balanaces
    mapping(address => uint256) public balanceOf;
    // Send Tokens
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(
    	string memory _name,
    	string memory _symbol,
    	uint256 _totalSupply
    	){
    	name = _name;
    	symbol = _symbol;
    	totalSupply = _totalSupply * (10**decimals);
		balanceOf[msg.sender] = totalSupply;

    }



    function transfer(address _to, uint256 _value)
	    public 
	    returns (bool success)
	    {

	    	_transfer(msg.sender, _to, _value);
	    	return true;

	    }


	function approve(address _spender, uint256 _value)
		public returns (bool success)
		{
			require(_spender != address(0));

			// allowance[msg.sender][_spender.address] = 0;
			allowance[msg.sender][_spender] = _value;
			require(allowance[msg.sender][_spender] == _value);
	    	emit Approval(msg.sender, _spender, _value);

			return true;

		}

	function _transfer(address _from, address _to, uint256 _value)
		internal
		{
			require( balanceOf[_from] >= _value);
			require(_to != address(0));
	    	balanceOf[_from] = balanceOf[_from] - _value;
	    	balanceOf[_to] =  balanceOf[_to] + _value;
	    	// emit Event
	    	emit Transfer(_from, _to, _value);
		}

	function transferFrom(address _from, address _to, uint256 _value)
		public returns (bool success)
		{

			// Check Approval
			// require()
			require(_value <= allowance[_from][msg.sender]);
			_transfer(_from, _to, _value);
			allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;
			return true;
			// Spend Tolens

		


		}


}
