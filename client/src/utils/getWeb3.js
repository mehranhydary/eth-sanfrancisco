import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    const provider = new Web3.providers.HttpProvider(
      "https://testnet.rcn.loans/requests"
    );
    let web3 = new Web3(provider);
    resolve(web3);
  });

export default getWeb3;
