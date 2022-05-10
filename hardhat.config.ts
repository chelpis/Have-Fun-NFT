import { HardhatUserConfig } from "hardhat/config";
import "hardhat-abi-exporter";

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
  },
};

export default config;
