const { network } = require("hardhat");
const hre = require("hardhat");
const { BigNumber, Contract, utils} = require("ethers");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    initialBalance = await deployer.getBalance();
    console.log("Initial balance:", initialBalance.toString());


    const Tutoken = await hre.ethers.getContractFactory("Tutoken");
    const tutoken = await Tutoken.deploy();
    console.log("tutoken:", tutoken.address);
    const amountConverted = utils.parseEther("63")
    let tx = await tutoken.createTutorial(17, amountConverted);
    let rc = await tx.wait();
    const event = rc.events.find(event => event.event === 'TutorialCreated');
    const [id, amount] = event.args;
    console.log('TutorialCreated:', id, amount);

    const tx2 = await tutoken.claimTutorial(17);
    let rc2 = await tx2.wait();
    const event2 = rc2.events.find(event => event.event === 'TutorialClaimed');
    const [address, id2, amount2] = event2.args;
    console.log('TutorialClaimed:', address, id2, amount2);


/*    const factoryAddress = "0xFef74DD15507Bff4B6922c5FFBA6a6ddfA94825f";

    // This is the ABI of the contract, you can get it from the Contract artifact
    // If the contract has been compiled with Hardhat, you can do the following:
    const contractArtifact = await hre.artifacts.readArtifact("UniswapV2Factory");
    const contractAbi = contractArtifact.abi;

    const signer = await deployer;

    // Get the contract
    const factory = new Contract(factoryAddress, contractAbi, signer);

    // Now you can interact with the contract
    // For example, you can call a function named `myFunction` like this:
    // const result = await contract.myFunction();

    console.log("Contract loaded successfully", factory.address);

    let pepitokenAddr = "0x6F23fEb93c48b6116f37B7f7C99F4642a9917298";
    let linkAddr = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";

    // let tx = await factory.createPair(pepitokenAddr, linkAddr);
    // let rc = await tx.wait();
    // const event = rc.events.find(event => event.event === 'PairCreated');
    // const [token0, token1, pair, pairsLength] = event.args;
    // console.log("pair:", pair);
    const tx = await factory.allPairs(1);

    console.log('allPairs:', tx)*/




/*    const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(deployer.address);
    console.log("factory:", factory.address);*/

/*    const initCodeHash = await factory.INIT_CODE_HASH();
    console.log("initCodeHash:", initCodeHash);
    console.log("initCodeHash is equal to UniswapV2Library value:", initCodeHash == "0x985b918db067ef96bbb88d62f3fc243fea5566f12c8e465d5e1cfc9133f38aa8");

    const PepiToken = await hre.ethers.getContractFactory("PepiToken");
    const pepitoken = await PepiToken.deploy();
    console.log("pepitoken:", pepitoken.address);*/

   /* const DummyToken = await hre.ethers.getContractFactory("DummyToken");
    const dummytoken = await DummyToken.deploy();
    console.log("dummytoken:", dummytoken.address);

    let token0Address = pepitoken.address;
    let token1Address = dummytoken.address;

    let tx = await factory.createPair(token0Address, token1Address);
    let rc = await tx.wait();
    const event = rc.events.find(event => event.event === 'PairCreated');
    const [token0, token1, pair, pairsLength] = event.args;
    console.log("pair:", pair);

    // Router
    const Weth = await hre.ethers.getContractFactory("WETH");
    const weth = await Weth.deploy();
    console.log("weth:", weth.address);

    const Router = await hre.ethers.getContractFactory("UniswapV2Router02")
    const router = await Router.deploy(factory.address, weth.address);

    console.log("router:", router.address);
    const finalBalance = await deployer.getBalance();
    console.log("Final balance:", finalBalance.toString());
    console.log("Spent:", hre.ethers.utils.formatEther(initialBalance.sub((finalBalance))), "ETH");*/
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
