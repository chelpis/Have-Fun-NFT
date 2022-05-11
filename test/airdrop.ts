import { expect } from "chai";
import { skipWeeks } from "./common";

export default function () {
  describe("after deployed", async function () {
    it("get all tokens", async function () {
      expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(34);
    });
  });

  describe("after a year", async function () {
    beforeEach(async function () {
      skipWeeks(52);
      await this.haveFunNFT.connect(this.target).setMaxSupply();
    });

    it("by target", async function () {
      await this.haveFunNFT.connect(this.target).airdrop();
      expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(35);
    });

    it("by chelpis", async function () {
      await this.haveFunNFT.connect(this.chelpis).airdrop();
      expect(await this.haveFunNFT.balanceOf(this.target.address)).to.equal(35);
    });
  });
}
