import { expect } from "chai";

export default function () {
  it("some tokens by target", async function () {
    await this.haveFunNFT.connect(this.target).airdrop([3, 4]);

    expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(2);
  });

  it("some tokens by chelpis", async function () {
    await this.haveFunNFT.connect(this.chelpis).airdrop([3, 4]);

    expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(2);
  });

  it("all tokens by target", async function () {
    await this.haveFunNFT
      .connect(this.target)
      .airdrop(Array.from({ length: 34 }, (_, i) => i + 1));

    expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(34);
  });

  it("all tokens by chelpis", async function () {
    await this.haveFunNFT
      .connect(this.chelpis)
      .airdrop(Array.from({ length: 34 }, (_, i) => i + 1));

    expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(34);
  });
}
