import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

/**
 * Hashes a message using keccak256.
 * @param {string} message
 * @returns {string} hash
 */
const hashMessage = (message) => keccak256(Uint8Array.from(message));

/**
 * Signs a message using a private key.
 * @param {string} message
 * @param {string} privateKey
 * @returns {Uint8Array} signature
 */
const signMessage = async (message, privateKey) => {
  try {
    const hash = hashMessage(message);
    const signature = await secp.sign(hash, privateKey, { recovered: true });

    return signature;
  } catch (err) {
    console.error(err);
    return null;
  }
};

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

export { signMessage, getAddressFromPublicKey };
