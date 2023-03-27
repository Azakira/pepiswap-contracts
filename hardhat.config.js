require("@nomicfoundation/hardhat-toolbox");
const secrets = require("./secrets.json")
/** @type import('hardhat/config').HardhatUserConfig */

let FUJI_PRIVATE_KEY = secrets.FUJI_PRIVATE_KEY;

if (FUJI_PRIVATE_KEY == null) {
  console.log("Your private key for the fuji network is not set")
  FUJI_PRIVATE_KEY = '0000000000000000000000000000000000000000000000000000000000000000';
}

module.exports = {
  networks: {
    hardhat: {
      // blockGasLimit: 3_000_000_000_000
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [FUJI_PRIVATE_KEY],
      timeout: 60000
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16", // Factory contracts
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          },
          evmVersion: "istanbul",
        }
      },
      {
        version: "0.6.6", // Routing contracts
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          },
          evmVersion: "istanbul",
        }
      },
    ],
  },
};