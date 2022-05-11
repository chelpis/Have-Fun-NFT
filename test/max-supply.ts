import { waffle } from "hardhat";
const { provider } = waffle;
import { expect } from "chai";

async function skipWeeks(n: number) {
  await provider.send("evm_increaseTime", [60 * 60 * 24 * 7 * n]);
}

export default function () {
  it("Get", async function () {
    expect(await this.haveFunNFT.connect(this.chelpis).maxSupply()).to.equal(
      34
    );
  });

  it("Set success after 48 weeks", async function () {
    await skipWeeks(48);

    expect(await this.haveFunNFT.connect(this.chelpis).setMaxSupply());
  });

  it("Set failed after 47 weeks", async function () {
    await skipWeeks(47);

    await expect(
      this.haveFunNFT.connect(this.chelpis).setMaxSupply()
    ).to.be.revertedWith(
      "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR"
    );
  });

  it("Set success after 56 weeks", async function () {
    await skipWeeks(56);

    expect(await this.haveFunNFT.connect(this.chelpis).setMaxSupply());
  });

  it("Set failed after 57 weeks", async function () {
    await skipWeeks(57);

    await expect(
      this.haveFunNFT.connect(this.chelpis).setMaxSupply()
    ).to.be.revertedWith(
      "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR"
    );
  });
}
