const hre = require("hardhat");
const {ethers} = require('ethers');

const {getERC20Balance} = require('./helpers');
const ERC20ABI = require('../abi.json');

require('dotenv').config();
const ALCHEMY_URL_TESTNET = process.env.ALCHEMY_URL_TESTNET;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.WALLET_SECRET;
const SINGLE_SWAP_CONTRACT_ADDRESS = process.env.SINGLE_SWAP_CONTRACT_ADDRESS;
const WMATIC_ADDRESS = process.env.WMATIC_ADDRESS;
const DAI_ADDRESS = process.env.DAI_ADDRESS;

let provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET);

const singleSwapContract = require("../artifacts/contracts/SingleSwap.sol/SingleSwap.json");

async function main() {
  const wallet = new ethers.Wallet(WALLET_SECRET,provider)

  const wmaticBalance = await getERC20Balance(wallet.address,WMATIC_ADDRESS,provider)
  const daiBalance = await getERC20Balance(wallet.address,DAI_ADDRESS,provider)

  console.log("Wallet WMATIC balance:", ethers.utils.formatEther(wmaticBalance));
  console.log("Wallet DAI balance:", ethers.utils.formatEther(daiBalance));

  const inputAmount = ethers.utils.parseUnits('1',18)

  const wmaticContract = new ethers.Contract(
    WMATIC_ADDRESS,
    ERC20ABI,
    provider
  )

  const singleSwap = new ethers.Contract(
    SINGLE_SWAP_CONTRACT_ADDRESS, //change this
    singleSwapContract.abi,
    provider
  );

  const gasPrice = await provider.getGasPrice();
  const maxGas = gasPrice.mul(2)

  console.log(singleSwap.address)

  const firstApproval = await wmaticContract.connect(wallet).approve(
    singleSwap.address,
    inputAmount,
    {gasPrice:gasPrice,gasLimit: ethers.utils.hexlify(500000)}
  )
  await firstApproval.wait()

  const outAmount = await singleSwap.connect(wallet).swapExactInputSingle(
    inputAmount,
    {gasPrice:gasPrice,gasLimit: ethers.utils.hexlify(500000)}
  )
  await outAmount.wait()

  console.log("Amount Out:",outAmount)


}

/*
async function getERC20Balance(walletAddress,erc20TokenAddress,provider) {

  const tokenContract = new ethers.Contract(
    erc20TokenAddress,
    ERC20ABI,
    provider
  )
  return tokenContract.balanceOf(walletAddress)
}
*/


main()
