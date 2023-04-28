const {ethers} = require('ethers');
const ERC20ABI = require('../abi.json');

exports.getERC20Balance = async (walletAddress,erc20TokenAddress,provider) => {

  const tokenContract = new ethers.Contract(
    erc20TokenAddress,
    ERC20ABI,
    provider
  )
  return tokenContract.balanceOf(walletAddress)
}
