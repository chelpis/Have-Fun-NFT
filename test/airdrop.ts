import { expect } from "chai";

export default function () {
  it("all tokens", async function () {
    await this.haveFunNFT
      .connect(this.chelpis)
      .airdrop(Array.from({ length: 34 }, (_, i) => i + 1));

    expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(34);
  });
}
