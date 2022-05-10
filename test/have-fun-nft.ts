import { waffle, ethers } from "hardhat";
import { expect } from "chai";
const { provider } = waffle;
import { Contract } from "@ethersproject/contracts";

describe("Have Fun NFT", function () {
  const [chelpis, target] = provider.getWallets();
  let haveFunNFT: Contract;

  beforeEach(async function () {
    const HaveFunNFT = await ethers.getContractFactory("HaveFunNFT");
    haveFunNFT = await HaveFunNFT.deploy("Foo", "Bar", 34, [
      target.address,
      [chelpis.address],
    ]);
    await haveFunNFT.deployed();
  });

  it("Max Supply Get", async function () {
    expect(await haveFunNFT.connect(chelpis).maxSupply()).to.equal(34);
  });
});
