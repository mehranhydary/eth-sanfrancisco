import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import Web3 from "web3";
import engineAbi from "./utils/NanoLoanEngine.json";
import oracleAbi from "./utils/Oracle.json";
import tokenAbi from "./utils/Token.json";
import contract from "truffle-contract";

import { BigNumber } from 'bignumber.js';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {

      // Setting up RCN:

      const web3 = await getWeb3();
      console.log(web3)
      const engine_address = "0xbee217bfe06c6faaa2d5f2e06ebb84c5fb70d9bf";
      const oracle_address = "0x0ac18b74b5616fdeaeff809713d07ed1486d0128";
      debugger
      console.log(engineAbi)
      // const engine = new web3.eth.Contract(engineAbi).at(engine_address);
      const engine = new web3.eth.Contract(engineAbi, engine_address);
      const oracle = new web3.eth.Contract(oracleAbi, oracle_address)
      // const Contract = contract({abi: engineAbi, address: engine_address});
      debugger
      const accounts = await web3.eth.getAccounts()
      // engine.setProvider(web3.currentProvider);
      // debugger
      const prevLoans = await engine.methods.getTotalLoans().call()
      debugger


      // let test = await engine.methods.createLoan(
      //               "0x0ac18b74b5616fdeaeff809713d07ed1486d0128",                         // Oracle
      //               accounts[0],                                                          // Borrower
      //               "0x4152530000000000000000000000000000000000000000000000000000000000", // Currency
      //               200001,                                                               // Amount
      //               15552000000000,                                                       // Interest rate
      //               4608000000001,                                                        // Punitive interest rate
      //               2678401,                                                              // Duration
      //               864001,                                                              // First payment
      //               9999999999998,                                                           // Expiration
      //               "Hello EVM!"
      //           ).send({from: accounts[0]})

      debugger

      const newLoans = await engine.methods.getTotalLoans().call()

      debugger

      const loan_id = newLoans - 1

      // Load oracle data
      const oracle_url = await oracle.methods.url().call();
      debugger
      const response = await (await fetch(oracle_url)).json();
      const oracle_data = response.find(i => i.currency == "0x4152530000000000000000000000000000000000000000000000000000000000")["data"];

      // Get rate estimation
      const rate_response = await oracle.methods.getRate("0x4152530000000000000000000000000000000000000000000000000000000000", oracle_data).call();
      const rate = rate_response[0];
      const decimals = rate_response[1];

      // Get amount to lend
      const amount_currency = await engine.methods.getAmount(loan_id).call();
      const amount_tokens = new BigNumber(amount_currency * rate * 10 ** (18 - decimals) / 10 ** 18).toFixed();
      debugger

      // Approve the RCN tokens debit
      const rcn_address = "0x2f45b6fb2f28a73f110400386da31044b2e953d4";
      const rcn_token = new web3.eth.Contract(tokenAbi, rcn_address);
      await rcn_token.methods.approve(engine_address, amount_tokens).send({from: accounts[0]});

      debugger

       // const oracle = await engine.methods.getOracle(249).call()
      const currency = await engine.methods.getCurrency(249).call()
      const currency2 = await engine.methods.getCurrency(299).call()
      const currency3 = await engine.methods.getCurrency(298).call()
      const interestRatePunitory = await engine.methods.getInterestRatePunitory(249).call()
      const duesIn = await engine.methods.getDuesIn(249).call()
      const cancelableAt = await engine.methods.getCancelableAt(249).call()
      const expirationRequest = await engine.methods.getExpirationRequest(249).call()
      const dueTime = await engine.methods.getDueTime(249).call()
      const cosigner = await engine.methods.getCosigner(249).call()

      debugger

      // Lend!
      let lend = await engine.methods.lend(
          loan_id,     // Loan id
          oracle_data, // Oracle data
          '0x0000000000000000000000000000000000000000',         // Cosigner address
          []          // Cosigner data
      ).send({ from: accounts[0] })

debugger

     



    //       function getOracle(uint index) public view returns (Oracle) { return loans[index].oracle; }
    // function getBorrower(uint index) public view returns (address) { return loans[index].borrower; }
    // function getCosigner(uint index) public view returns (address) { return loans[index].cosigner; }
    // function getCreator(uint index) public view returns (address) { return loans[index].creator; }
    // function getAmount(uint index) public view returns (uint256) { return loans[index].amount; }
    // function getPunitoryInterest(uint index) public view returns (uint256) { return loans[index].punitoryInterest; }
    // function getInterestTimestamp(uint index) public view returns (uint256) { return loans[index].interestTimestamp; }
    // function getPaid(uint index) public view returns (uint256) { return loans[index].paid; }
    // function getInterestRate(uint index) public view returns (uint256) { return loans[index].interestRate; }
    // function getInterestRatePunitory(uint index) public view returns (uint256) { return loans[index].interestRatePunitory; }
    // function getDueTime(uint index) public view returns (uint256) { return loans[index].dueTime; }
    // function getDuesIn(uint index) public view returns (uint256) { return loans[index].duesIn; }
    // function getCancelableAt(uint index) public view returns (uint256) { return loans[index].cancelableAt; }
    // function getApprobation(uint index, address _address) public view returns (bool) { return loans[index].approbations[_address]; }
    // function getStatus(uint index) public view returns (Status) { return loans[index].status; }
    // function getLenderBalance(uint index) public view returns (uint256) { return loans[index].lenderBalance; }
    // function getApproved(uint index) public view returns (address) {return loans[index].approvedTransfer; }
    // function getCurrency(uint index) public view returns (bytes32) { return loans[index].currency; }
    // function getExpirationRequest(uint index) public view returns (uint256) { return loans[index].expirationRequest; }
    // function getInterest(uint index) public view returns (uint256) { return loans[index].interest; }

      debugger


      // async function createLoan(engine, oracle, borrower, currency, amount, interestRate, interestRatePunitory, duration,
      //     cancelableAt, expireTime, from, metadata) {
      //     let prevLoans = (await engine.getTotalLoans()).toNumber()
      //     await engine.createLoan(oracle, borrower, currency, amount, interestRate, interestRatePunitory,
      //         duration, cancelableAt, expireTime, metadata, { from: from })
      //     let newLoans = (await engine.getTotalLoans()).toNumber()
      //     assert.equal(prevLoans, newLoans - 1, "No more than 1 loan should be created in parallel, during tests")
      //     return newLoans - 1;
      // }

      // async function lendLoan(rcn, engine, account, index, max) {
      //     await Helper.buyTokens(rcn, max, account);
      //     await rcn.approve(engine.address, max, {from:account})
      //     await engine.lend(index, [], 0x0, [], {from:account})
      // }

      // it("It should fail creating two identical loans", async() => {
      //     // create a new loan
      //     let loanId1 = await createLoan(engine, 0x0, accounts[1], 0x0, web3.toWei(2), Helper.toInterestRate(27), Helper.toInterestRate(40),
      //         86400, 0, 10 * 10**20, accounts[0], "");
      //     assert.equal(loanId1, 1)




      debugger

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3,  contract: engine });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };
  toInterestRate(interest) {
    return (10000000 / interest) * 360 * 86400;
  }
  createLoanOnRCN = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.createLoan(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ loan_id: response });
  };

  approveLoanOnRCN = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.createLoan(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ loan_id: response });
  };  

  lendALoanOnRCN = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.createLoan(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ loan_id: response });
  };  
  payLoanOnRCN = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.createLoan(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ loan_id: response });
  };    
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 37</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
