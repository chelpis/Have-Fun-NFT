import { waffle, ethers } from "hardhat";
const { provider } = waffle;

import airdrop from "./airdrop";
import maxSupply from "./max-supply";
import tokenURI from "./token-uri";
import erc721 from "./erc721";
import accessControl from "./access-control";

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

  describe("Airdrop", airdrop.bind(this));
  describe("Max Supply", maxSupply.bind(this));
  describe("Token URI", tokenURI.bind(this));
  describe("Erc721 External ABIs", erc721.bind(this));
  describe("Access Control", accessControl.bind(this));
});
