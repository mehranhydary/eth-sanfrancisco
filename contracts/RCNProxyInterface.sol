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
	) public returns (uint256 id);

	function approveLoan(uint256 _loan_identifier);

	function lendALoan(
		uint256 _loan_identifier,
		bytes32 _oracle_data,
	) external;

	function payLoan (
		uint256 loanId, 
		bytes oracleData, 
		address cosigner, 
		bytes cosignerData
	) external returns (bool);

	function pay(
		uint256 loanId, 
		uint128 amount, 
		address from, 
		bytes oracleData
	) external returns (bool);

	function consign(
		uint loanId, uint256 cos
	) external returns (bool);

	function withdrawLoan (
		uint loanId, 
		address to, 
		uint128 amount
	) public returns (bool);
}