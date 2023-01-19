const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256

  if (!event) return TRIVIAL_PARTITION_KEY;

  if (typeof event === 'function' || typeof event.partitionKey === 'function') {
    throw new Error('invalid parameter')
  }

  let dataToEncrypt = event.partitionKey || event
  let stringifiedData = typeof dataToEncrypt !== 'string' ? JSON.stringify(dataToEncrypt) : dataToEncrypt;
  if (event.partitionKey && stringifiedData.length <= MAX_PARTITION_KEY_LENGTH) {
    return stringifiedData;
  }
  return crypto.createHash("sha3-512").update(stringifiedData).digest("hex")
};