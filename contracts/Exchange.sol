// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";



// // TODO
// Deposit Tokens
// Withdraw Tokens
// Check Balances
// Make Ordes
// Cancel Orders
// Fill Orders 
// Charge Fees
// Trach Fee Account


contract Exchange {

    address public feeAccount;
    uint256 public feePercent;
    mapping(address=> mapping(address=>uint256)) public tokens;

    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(address token, address user, uint256 amount, uint256 balance);


    constructor(address _feeAccount, uint256 _feePercent ){
        feeAccount = _feeAccount;
        feePercent = _feePercent;



    }

    function withdrawTokens(address _token, uint256 _amount) public {

    	require(_amount <= tokens[_token][msg.sender]);


    	// call token.transferFrom
		Token(_token).transfer(msg.sender, _amount);

    	// Update user balance
    	tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;  

    	// emit event
		emit Withdraw(_token, msg.sender, _amount, balanceOf(_token, msg.sender));



    }

    function depositToken( address _token, uint256 _amount) public {

    	require(Token(_token).transferFrom(msg.sender, address(this), _amount));

    	// Transfer tokens to echange
    	

    	// Update user balance
		tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

    	// emit an event
    	emit Deposit(_token, msg.sender, _amount, balanceOf(_token, msg.sender));


    }

    function balanceOf(address _token, address _user)
    public
    view
    returns (uint256)
    {

    	return tokens[_token][_user];


    }

}