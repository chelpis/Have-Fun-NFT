import { expect } from "chai";

export default function () {
  it("Congratulate target", async function () {
    await expect(
      this.haveFunNFT.connect(this.chelpis).congratulateTarget("Hello, Danny")
    ).to.emit(this.haveFunNFT, "Congrats");
  });
}
