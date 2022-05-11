import { waffle } from "hardhat";
const { provider } = waffle;

export async function skipWeeks(n: number) {
  await provider.send("evm_increaseTime", [60 * 60 * 24 * 7 * n]);
}
