require("@nomiclabs/hardhat-waffle");

require('dotenv').config();
const ALCHEMY_URL_TESTNET = process.env.ALCHEMY_URL_TESTNET;
const DEPLOYER_PRIVATE_KEY = process.env.WALLET_SECRET;

module.exports = {
  solidity: "0.7.6",
  networks: {
    polygon: {
      url: `${ALCHEMY_URL_TESTNET}`,
      accounts: [DEPLOYER_PRIVATE_KEY]
    }
  }
};
