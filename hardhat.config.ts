import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-abi-exporter";
import "@nomiclabs/hardhat-waffle";
import { NetworkUserConfig } from "hardhat/types";

dotenv.config();

task("networks", "Prints the list of networks", async () => {
  if (typeof config.networks === undefined) {
    console.log("No supported network");
    return;
  }

  const networks = Object.keys(config.networks as NetworkUserConfig).map(
    (key, _) => {
      return key;
    }
  );
  console.log(networks);
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

function genPrivateKey(n: number): any {
  const result = [];
  for (let i = 0; i < n; i++) {
    const buf = Buffer.alloc(32);
    buf.writeInt32BE(i + 1);
    result.push({
      privateKey: buf.toString("hex"),
      balance: "10000000000000000000000",
    });
  }
  return result;
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  abiExporter: { runOnCompile: true, clear: true, flat: true, pretty: true },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: genPrivateKey(20),
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    polygonmMumbai: {
      url: process.env.POLYGON_MUMBAI_URL,
      accounts: [
        "0xc1ce8c29ed57cb90819375354e72e5ad2a4c1b50fe5690fb52a841a454f74a2c",
      ],
    },
    polygonMainnet: {
      url: process.env.POLYGON_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
