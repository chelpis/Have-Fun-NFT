import { expect } from "chai";

const tokenURIPrefix = "https:/example.com/";
export default function () {
  it("Set token URI prefix call", async function () {
    expect(
      await this.haveFunNFT
        .connect(this.chelpis)
        .setTokenURIPrefix(tokenURIPrefix)
    );
  });

  it("Check 1 token URI", async function () {
    await this.haveFunNFT
      .connect(this.chelpis)
      .setTokenURIPrefix(tokenURIPrefix);

    expect(await this.haveFunNFT.connect(this.chelpis).tokenURI(1)).to.be.equal(
      tokenURIPrefix + 1
    );
  });

  it("Check 34 token URIs", async function () {
    await this.haveFunNFT
      .connect(this.chelpis)
      .setTokenURIPrefix(tokenURIPrefix);

    await Promise.all(
      Array.from({ length: 34 }, (_, i) => i + 1).map(async (i) => {
        expect(
          await this.haveFunNFT.connect(this.chelpis).tokenURI(i)
        ).to.be.equal(tokenURIPrefix + i);
      })
    );
  });
}
