require("dotenv").config();
const colors = require("colors");
const { Web3 } = require("web3");
const fs = require("fs");
const abi = require("./sample_abis/abi_glm.js");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
const contract = new web3.eth.Contract(abi.abi, process.env.SMART_CONTRACT_ETH);

const UniqueAddresses = new Set();

getEvents = async (minBlock, maxBlock, arrWithUniqueAddresses) => {
  let options = {
    fromBlock: minBlock,
    toBlock: maxBlock,
  };

  addresses = await contract
    .getPastEvents("Transfer", options)
    .then((results) => {
      localUniqueAddresses = new Set();
      results.forEach((res) => {
        localUniqueAddresses.add(res.returnValues.from);
        localUniqueAddresses.add(res.returnValues.to);
      });
      return localUniqueAddresses;
    })
    .catch((err) => {
      throw err;
    });

  for (address of addresses) arrWithUniqueAddresses.add(address);
};

getAllTransfers = async () => {
  const startBlock = parseInt(await web3.eth.getBlockNumber());
  console.log("CURRENT BLOCK = " + startBlock);
  let offset = 10000;
  let endBlock = 0;

  let totalCalls = (startBlock - endBlock) / offset;
  console.log("total expected calls : " + Math.ceil(totalCalls));
  console.log("scanning " + colors.yellow(offset) + " blocks every call");
  times = [];
  let counter = 0;
  for (i = startBlock; i >= endBlock; i -= offset) {
    counter++;
    var startTime = performance.now();
    await getEvents(Math.max(0, i - offset), i, UniqueAddresses);
    var endTime = performance.now();
    var callTime = endTime - startTime;
    times.push(callTime);
    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    const expectedTime = averageTime * totalCalls;
    console.log(
      `${colors.green(counter)}. block ${colors.red(
        i
      )} : unique GLM addresses: ${colors.blue(
        UniqueAddresses.size.toString().padStart(7, " ")
      )}   -   took ${colors.yellow(Math.round(callTime))}ms, avg=${colors.cyan(
        Math.floor(averageTime)
      )}ms, expected total time = ${colors.cyan(
        Math.round((100 * expectedTime) / (1000 * 60 * 60)) / 100
      )}hrs`
    );
  }
  fs.writeFileSync("addresses.json", JSON.stringify([...UniqueAddresses]));
};

getAllTransfers();
