const { network } = require("hardhat");
const hre = require("hardhat");
const { BigNumber } = require("ethers");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    initialBalance = await deployer.getBalance();
    console.log("Initial balance:", initialBalance.toString());

    const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(deployer.address);
    console.log("factory:", factory.address);

    const initCodeHash = await factory.INIT_CODE_HASH();
    console.log("initCodeHash:", initCodeHash);
    console.log("initCodeHash is equal to UniswapV2Library value:", initCodeHash == "0x985b918db067ef96bbb88d62f3fc243fea5566f12c8e465d5e1cfc9133f38aa8");

    const PepiToken = await hre.ethers.getContractFactory("PepiToken");
    const pepitoken = await PepiToken.deploy();
    console.log("pepitoken:", pepitoken.address);

    const DummyToken = await hre.ethers.getContractFactory("DummyToken");
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
    console.log("Spent:", hre.ethers.utils.formatEther(initialBalance.sub((finalBalance))), "ETH");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });