const hre = require("hardhat");
const {expect} = require("chai");

require('dotenv').config();
const ALCHEMY_URL_TESTNET = process.env.ALCHEMY_URL_TESTNET;
const WALLET_SECRET = process.env.WALLET_SECRET;

async function main() {
  let provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET);
  let privateKey = process.env.WALLET_SECRET;
  let wallet = new ethers.Wallet(privateKey,provider);

  const gasPrice = await provider.getGasPrice();
  const maxGas = gasPrice.mul(2)

  console.log(wallet.address)
  console.log("deploying...");

  const SwapExample = await ethers.getContractFactory('SwapExample',wallet);

  const singleSwapExample = await SwapExample.deploy(
    {gasPrice:gasPrice,gasLimit: ethers.utils.hexlify(1000000)}
  );

  await singleSwapExample.deployed();

  console.log("Single Swap contract deployed: ", singleSwapExample.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
