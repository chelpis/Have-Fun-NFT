import { expect } from "chai";

export default function () {
  it("transfer reverted", async function () {
    await expect(
      this.haveFunNFT
        .connect(this.target)
        .transferFrom(this.target.address, this.chelpis.address, 1)
    ).to.be.reverted;
  });

  it("safeTransferFrom reverted", async function () {
    await expect(
      this.haveFunNFT
        .connect(this.target)
        ["safeTransferFrom(address,address,uint256)"](
          this.target.address,
          this.chelpis.address,
          1
        )
    ).to.be.reverted;
  });

  it("safeTransferFrom data reverted", async function () {
    await expect(
      this.haveFunNFT
        .connect(this.target)
        ["safeTransferFrom(address,address,uint256)"](
          this.target.address,
          this.chelpis.address,
          1,
          []
        )
    ).to.be.reverted;
  });

  it("approve reverted", async function () {
    await expect(
      this.haveFunNFT.connect(this.target).approve(this.chelpis.address, 1)
    ).to.be.reverted;
  });

  it("setApprovalForAll reverted", async function () {
    await expect(
      this.haveFunNFT
        .connect(this.target)
        .setApprovalForAll(this.chelpis.address, true)
    ).to.be.reverted;
  });
}
