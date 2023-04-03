import { useMemo, useState } from "react";

import server from "./server";
import wallets, { signTransfer } from "./lib/wallets";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");

  const wallet = useMemo(
    () => wallets.find((w) => w.address === address),
    [address]
  );

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const transfer = async (evt) => {
    evt.preventDefault();

    try {
      const transfer = { recipient, amount: parseInt(sendAmount) };
      const signature = await signTransfer(transfer, wallet.privateKey);

      const {
        data: { balance },
      } = await server.post(`send`, {
        signature,
        transfer,
      });

      setBalance(balance);
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
          disabled={!address}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: ea9b500eb8ede4f424846779b311daefcd9ab5b5"
          value={recipient}
          onChange={setValue(setRecipient)}
          disabled={!address}
        ></input>
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
