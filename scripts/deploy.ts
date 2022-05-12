import { ethers } from "hardhat";

async function main() {
  const HaveFunNFT = await ethers.getContractFactory("HaveFunNFT");
  const haveFunNFT = await HaveFunNFT.deploy(
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL,
    process.env.MAX_SUPPLY,
    [process.env.TARGET, (process.env.CHELPIS as string).split(",")]
  );
  await haveFunNFT.deployed();
  console.log("HaveFunNFT is deployed at address: ", haveFunNFT.address);

  console.log(
    "Airdropped to target: %i tokens",
    await haveFunNFT.balanceOf(process.env.TARGET)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
