// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import this file to use console.log
import 'hardhat/console.sol';

// console.log('Unlock time is %o and block timestamp is %o', unlockTime, block.timestamp);
contract DappToken {
    // string public name = 'Dapp University';
    // string public symbol = 'DAPP';
    
    // uint256 public totalSupply = 1000000 * (10**decimals);
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    // Track balanaces
    mapping(address => uint256) public balanceOf;
    // Send Tokens

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply){
    	name = _name;
    	symbol = _symbol;
    	totalSupply = _totalSupply * (10**decimals);
		balanceOf[msg.sender] = totalSupply;

    }

}
