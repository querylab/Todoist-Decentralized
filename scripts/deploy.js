// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Todoist = await ethers.getContractFactory("Todoist");

  // Start deployment, returning a promise that resolves to a contract object
  const TodoTask = await Todoist.deploy();

  //Consol View
  console.log("***********************************************************************************");
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("***********************************************************************************\n");
  console.log("Todoist Contract Address\n ");
  console.log(TodoTask.address, "\n");
  console.log("***********************************************************************************");
}

// Llama a la función main
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});