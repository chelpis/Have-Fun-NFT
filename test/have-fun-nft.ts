import { waffle, ethers } from "hardhat";
import { expect } from "chai";
const { provider } = waffle;
import { Contract } from "@ethersproject/contracts";

async function skipWeeks(n: number) {
  await provider.send("evm_increaseTime", [60 * 60 * 24 * 7 * n]);
}

describe("Have Fun NFT", function () {
  const [chelpis, target] = provider.getWallets();
  let haveFunNFT: Contract;

  beforeEach(async function () {
    provider.send("hardhat_reset", []);
    const HaveFunNFT = await ethers.getContractFactory("HaveFunNFT");
    haveFunNFT = await HaveFunNFT.deploy("Foo", "Bar", 34, [
      target.address,
      [chelpis.address],
    ]);
    await haveFunNFT.deployed();
  });

  it("airdrop", async function () {
    await haveFunNFT
      .connect(chelpis)
      .airdrop(Array.from({ length: 34 }, (_, i) => i + 1));

    expect(await haveFunNFT.balanceOf(target.address)).to.equal(34);
  });

  it("Max Supply Get", async function () {
    expect(await haveFunNFT.connect(chelpis).maxSupply()).to.equal(34);
  });

  it("Max Supply Set success after 48 weeks", async function () {
    await skipWeeks(48);

    expect(await haveFunNFT.connect(chelpis).setMaxSupply());
  });

  it("Max Supply Set failed after 47 weeks", async function () {
    await skipWeeks(47);

    await expect(haveFunNFT.connect(chelpis).setMaxSupply()).to.be.revertedWith(
      "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR"
    );
  });

  it("Max Supply Set success after 56 weeks", async function () {
    await skipWeeks(56);

    expect(await haveFunNFT.connect(chelpis).setMaxSupply());
  });

  it("Max Supply Set failed after 57 weeks", async function () {
    await skipWeeks(57);

    await expect(haveFunNFT.connect(chelpis).setMaxSupply()).to.be.revertedWith(
      "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR"
    );
  });
});
