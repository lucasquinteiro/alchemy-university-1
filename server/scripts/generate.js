const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log("Private key:", toHex(privateKey));
console.log("Public key:", toHex(publicKey));

// Samples

// Private key: 89105c01215527563a68b986363b40d2d505da99ba279fb94b532d2199bd800b
// Public key: 049aac26f97f236703a66a4559b31c01f033e216249d3104ce0837d0f500baeadd370dcea76b3426d66d9eba509d9615d8a02096d3bde3a68743172c18001fa735

// Private key: ffafa0ce623296d59caad87d0d4e19788f2e140c64a2a109f1fc5d255d4545fb
// Public key: 0419a19f42f1b63916fa8a3feee11b6ac9eb1b318aa7d36485b4e5a1f06ffc087fe27557d683d08b9f2243a2e9335289e5b070403a626902b3b3b7547587a393e0

// Private key: 3cb77691e3ab54b1fddfe41bf439ef46e0de64d411223a811033697c41450f6c
// Public key: 0428838f7c5c95929fd909483ca08bc9571dcd7a7a4ae8d2d11c6aa7d2263b2e9c0914c72b125a84b5744690e3092930514e91ed9f15b3b166e948f31b2f9e26e8
