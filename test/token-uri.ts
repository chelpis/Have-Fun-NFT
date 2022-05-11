import { expect } from "chai";

export default function () {
  it("Set 1 token", async function () {
    expect(
      await this.haveFunNFT
        .connect(this.chelpis)
        .setTokenURI([[1, "https://example.com"]])
    );
  });

  it("Set 1 token", async function () {
    await this.haveFunNFT
      .connect(this.chelpis)
      .setTokenURI([[1, "https://example.com"]]);

    expect(await this.haveFunNFT.connect(this.chelpis).tokenURI(1)).to.be.equal(
      "https://example.com"
    );
  });
}
