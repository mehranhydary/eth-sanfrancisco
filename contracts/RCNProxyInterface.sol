pragma solidity ^0.4.24;

contract RCNProxyInterface {
	// Cannot be greater than 10 ETH
	uint8 loanRequested;

	function contributeEther() payable {
		// can provide ether to smart contract 
		// can provide exactly 1 ETH
		// need to check balance; get address
	};
	function createLoan(
	    address _oracle,
	    address _borrower,
	    bytes32 _currency,
	    uint256 _amount,
	    uint256 _interestRate,
	    uint256 _penaltyInterestRate,
	    uint256 _duesIn,
	    uint256 _firstPayment,
	    uint256 _expiration,
	    string _metadata
	) public returns (uint256 id) {

	}
	function approveLoan() {

	}
	function payLoan () {

	}

	function withdrawLoan () {

	}
	// Creating loans will require the following inputs:
		// x. oracle, borrower, currency, amount, 
		// 		interest rate, pentality interest rate, dues in, 
		// 		first payment, expiration, meta data


}

// Contract address; import that; get the contract will look liel; use that to interface it; use that as a contract address in web 3; once we have that we can create a proxy contract based on those functions; then we can allow 

// people can put in 1 eth; puts in a request into RCN for how much they want as a loan; different parameters; and then based on that (simplest requiest is 10 eth); allow 10 people to put in 1 ETH; risk mitigation via that; payable functions for people to put; last person to put it in; 