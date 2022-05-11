import { expect } from "chai";
import { skipWeeks } from "./common";

export default function () {
  it("Get", async function () {
    expect(await this.haveFunNFT.connect(this.target).maxSupply()).to.equal(34);
  });

  it("Set success after 48 weeks", async function () {
    await skipWeeks(48.1);

    expect(await this.haveFunNFT.connect(this.target).setMaxSupply());
  });

  it("Set failed after 47 weeks", async function () {
    await skipWeeks(47);

    await expect(
      this.haveFunNFT.connect(this.target).setMaxSupply()
    ).to.be.revertedWith(
      "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR"
    );
  });

  it("Set success after 56 weeks", async function () {
    await skipWeeks(55.9);

    expect(await this.haveFunNFT.connect(this.target).setMaxSupply());
  });

  it("Set failed after 57 weeks", async function () {
    await skipWeeks(57);

    await expect(
      this.haveFunNFT.connect(this.target).setMaxSupply()
    ).to.be.revertedWith(
      "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR"
    );
  });
}
