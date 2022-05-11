import { expect } from "chai";

const tokenURIPrefix = "https:/example.com/";
export default function () {
  it("Set 1 token call", async function () {
    expect(
      await this.haveFunNFT
        .connect(this.chelpis)
        .setTokenURI([[1, tokenURIPrefix + 1]])
    );
  });

  it("Set 1 token", async function () {
    await this.haveFunNFT
      .connect(this.chelpis)
      .setTokenURI([[1, tokenURIPrefix + 1]]);

    expect(await this.haveFunNFT.connect(this.chelpis).tokenURI(1)).to.be.equal(
      tokenURIPrefix + 1
    );
  });

  it("Set 34 tokens call", async function () {
    expect(
      await this.haveFunNFT
        .connect(this.chelpis)
        .setTokenURI(
          Array.from({ length: 34 }, (_, i) => [
            i + 1,
            tokenURIPrefix + (i + 1),
          ])
        )
    );
  });

  it("Set 34 tokens", async function () {
    const uris = Array.from({ length: 34 }, (_, i) => [
      i + 1,
      tokenURIPrefix + (i + 1),
    ]);
    await this.haveFunNFT.connect(this.chelpis).setTokenURI(uris);

    await Promise.all(
      Array.from({ length: 34 }, (_, i) => i + 1).map(async (i) => {
        expect(
          await this.haveFunNFT.connect(this.chelpis).tokenURI(i)
        ).to.be.equal(tokenURIPrefix + i);
      })
    );
  });
}
