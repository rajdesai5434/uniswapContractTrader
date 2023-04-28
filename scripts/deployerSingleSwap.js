const hre = require("hardhat");
const {expect} = require("chai");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address)
  console.log("deploying...");
  const SingleSwap = await ethers.getContractFactory('SingleSwap',deployer);
  const singleSwap = await SingleSwap.deploy();

  await singleSwap.deployed();

  console.log("Single Swap contract deployed: ", singleSwap.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
