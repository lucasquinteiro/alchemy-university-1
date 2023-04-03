const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {
  utf8ToBytes,
  toHex,
  hexToBytes,
} = require("ethereum-cryptography/utils");

/**
 * Hashes a message using keccak256.
 * @param {string} message
 * @returns {string} hash
 */
const hashMessage = (message) => keccak256(Uint8Array.from(message));

/**
 * Generates an address from a public key by hashing the public key and taking the last 20 bytes.
 * @param {string} publicKey
 * @returns {string} address
 */
const getAddressFromPublicKey = (publicKey) => {
  const bytes = utf8ToBytes(publicKey);
  const hash = keccak256(bytes.slice(1));
  const address = toHex(hash.slice(-20));

  return address;
};

// In our use case the message is the address of the wallet which will also be the public key.
/**
 * Signs a message using a private key.
 * @param {string} message
 * @param {string} privateKey
 * @returns {string} signature
 */
const signMessage = async (message, privateKey) => {
  const hash = hashMessage(message);
  const signature = await secp.sign(hash, privateKey);

  return toHex(signature);
};

const getRecoveryBitFromSignature = (signature) => {
  const bytes = hexToBytes(signature);
  const recoveryBit = bytes[0];
  const sig = bytes.slice(1);

  return [sig, recoveryBit];
};

/**
 * Recovers a public key from a message and signature.
 * @param {string} message
 * @param {string} signature (an hex string containing the signature and the recovery bit)
 * @returns {string} publicKey
 */
const getPublicKeyFromSignature = async (message, signature) => {
  const [sig, recoveryBit] = getRecoveryBitFromSignature(signature);

  const hash = hashMessage(message);
  const publicKey = await secp.recoverPublicKey(hash, sig, recoveryBit);
  const publicKeyHex = toHex(publicKey);

  return publicKeyHex;
};

module.exports = {
  hashMessage,
  getAddressFromPublicKey,
  getPublicKeyFromSignature,
  getRecoveryBitFromSignature,
  signMessage,
};
