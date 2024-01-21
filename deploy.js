const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.getDefaultProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet("0xf143fa4c71e9c263fb6883034c9318c7a4edc0cb48f933a6fb7b7fa6fbf55224", provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contract = new ethers.ContractFactory(abi, binary, wallet);

  // Deploy the contract
  console.log("Deploying please wait..");
  const deploymentTransaction = await contract.getDeployTransaction();
  const deploymentResponse = await wallet.sendTransaction(deploymentTransaction);
  await deploymentResponse.wait(1);

  console.log("Deployment transaction hash:", deploymentResponse.hash);

  // Access the deployed contract using the transaction receipt
  const receipt = await deploymentResponse.wait(1);
  const deployedContractAddress = receipt.contractAddress;

  const deployedContract = new ethers.Contract(deployedContractAddress, abi, wallet);

  // Interact with the deployed contract
  const favoriteNumber = await deployedContract.retrieve();
  console.log("FavoriteNumber:", favoriteNumber.toString());

  const setFavoriteNumberTransaction = await deployedContract.store(7);
  await setFavoriteNumberTransaction.wait(1);

  const updatedFavoriteNumber = await deployedContract.retrieve();
  console.log("Updated Favorite Number:", updatedFavoriteNumber.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
