const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {
  getAddressFromPublicKey,
  getPublicKeyFromSignature,
} = require("./utils");

app.use(cors());
app.use(express.json());

const publicKeys = [
  "049aac26f97f236703a66a4559b31c01f033e216249d3104ce0837d0f500baeadd370dcea76b3426d66d9eba509d9615d8a02096d3bde3a68743172c18001fa735",
  "0419a19f42f1b63916fa8a3feee11b6ac9eb1b318aa7d36485b4e5a1f06ffc087fe27557d683d08b9f2243a2e9335289e5b070403a626902b3b3b7547587a393e0",
  "0428838f7c5c95929fd909483ca08bc9571dcd7a7a4ae8d2d11c6aa7d2263b2e9c0914c72b125a84b5744690e3092930514e91ed9f15b3b166e948f31b2f9e26e8",
];

const addresses = publicKeys.map((publicKey) =>
  getAddressFromPublicKey(publicKey)
);

const balances = {
  [addresses[0]]: 100,
  [addresses[1]]: 50,
  [addresses[2]]: 75,
};

console.log("balances", balances);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;

  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { signature, transfer } = req.body;
  const { recipient, amount } = transfer;

  const publicKey = await getPublicKeyFromSignature(
    JSON.stringify(transfer),
    signature
  );
  const sender = getAddressFromPublicKey(publicKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    return res.status(400).send({ message: "Not enough funds!" });
  }

  if (sender === recipient) {
    return res
      .status(400)
      .send({ message: "The sender cannot be the same as the recipient..." });
  }

  balances[sender] -= amount;
  balances[recipient] += amount;
  return res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
