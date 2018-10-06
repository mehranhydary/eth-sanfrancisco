import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import Web3 from "web3";
import engineAbi from "./utils/NanoLoanEngine.json";
import contract from "truffle-contract";


import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {

      // Setting up RCN:

      const web3 = await getWeb3();
      console.log(web3)
      const engine_address = "0xba5a17f8ad40dc2c955d95c0547f3e6318bd72e7";
      // const engine = new web3.eth.Contract(engineAbi).at(engine_address);
      const Contract = contract({abi: engineAbi, address: engine_address});
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3,  contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
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
