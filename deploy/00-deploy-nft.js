const { network } = require("hardhat");
require("dotenv").config();

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("Deploying Swisstronik........");
  const BasicNft = await deploy("BasicNFT", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`Contract deployed at ${BasicNft.address}`);
};

module.exports.tags = ["all", "BasicNft"];
