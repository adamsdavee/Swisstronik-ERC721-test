const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xA6BD9FdEee10b7EaF4BB84Fc6e1bB8082B78FC43";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("BasicNFT");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "mintNft";
  const addressToSendNft = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
  const txResponse = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [addressToSendNft]),
    0
  );
  await txResponse.wait();
  console.log("Transaction Receipt: ", txResponse);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
