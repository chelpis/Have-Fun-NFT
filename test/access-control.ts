import { expect } from "chai";
import { keccak256 } from "ethers/lib/utils";
import { skipWeeks } from "./common";

export default function () {
  it("setMaxSupply reverted, call by target", async function () {
    skipWeeks(52);
    expect(await this.haveFunNFT.connect(this.target).setMaxSupply());
  });

  it("setMaxSupply succeeded, call by chelpis", async function () {
    skipWeeks(52);
    await expect(this.haveFunNFT.connect(this.chelpis).setMaxSupply()).to.be
      .reverted;
  });

  it("setTokenURI reverted, call by target", async function () {
    await expect(this.haveFunNFT.connect(this.target).setTokenURI([])).to.be
      .reverted;
  });

  it("setTokenURI succeeded, call by chelpis", async function () {
    expect(await this.haveFunNFT.connect(this.chelpis).setTokenURI([]));
  });

  it("grantRole reverted", async function () {
    await expect(
      this.haveFunNFT
        .connect(this.target)
        .grantRole(
          keccak256(Buffer.from("CHELPIS", "ascii")),
          this.target.address
        )
    ).to.be.reverted;
  });

  it("revokeRole succeeded", async function () {
    await this.haveFunNFT
      .connect(this.target)
      .revokeRole(
        keccak256(Buffer.from("CHELPIS", "ascii")),
        this.chelpis.address
      );

    await expect(this.haveFunNFT.connect(this.chelpis).setTokenURI([])).to.be
      .reverted;
  });
}
