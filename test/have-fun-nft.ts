import { waffle, ethers } from "hardhat";
const { provider } = waffle;

import airdrop from "./airdrop";
import maxSupply from "./max-supply";

describe("Have Fun NFT", function () {
  beforeEach(async function () {
    provider.send("hardhat_reset", []);
    [this.chelpis, this.target] = provider.getWallets();
    const HaveFunNFT = await ethers.getContractFactory("HaveFunNFT");
    this.haveFunNFT = await HaveFunNFT.deploy("Foo", "Bar", 34, [
      this.target.address,
      [this.chelpis.address],
    ]);
    await this.haveFunNFT.deployed();
  });

  describe("airdrop", airdrop.bind(this));
  describe("Max Supply", maxSupply.bind(this));
});
