var RCNProxyInterface = artifacts.require("./RCNProxyInterface.sol");

module.exports = function(deployer) {
  deployer.deploy(RCNProxyInterface);
};
