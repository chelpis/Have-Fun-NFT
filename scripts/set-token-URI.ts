import { ethers } from "hardhat";

async function main() {
  const haveFunNFT = await ethers.getContractAt(
    "HaveFunNFT",
    process.env.DEPLOYED_ADDRESS as string
  );

  await haveFunNFT.setTokenURIPrefix(process.env.TOKEN_URI_PREFIX);
  console.log("Set contract token URIs succeeded.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
