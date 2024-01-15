const ethers = require("ethers");
const fs = require("fs-extra")

async function main() {

const provider = new ethers.getDefaultProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet("0xf2b4be7bdd9520901d41b5fe3740b8ff49723debe5cab3f2964526b25d865717", provider)

const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
console.log("Deploying please wait..")
const contract = await contractFactory.deploy();

}

main()

.then( () => process.exit(0))
.catch( (error) => {
    console.error(error)
    process.exit(1)
})