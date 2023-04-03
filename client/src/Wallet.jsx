import { useState } from "react";
import wallets from "./lib/wallets";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  const [error, setError] = useState("");

  const handleGetBalance = async (updatedAddress) => {
    try {
      const {
        data: { balance },
      } = await server.get(`balance/${updatedAddress}`);
      return balance;
    } catch (ex) {
      setError("There was an error getting the balance");
    }
  };

  async function onChange(evt) {
    const newAddress = evt.target.value;
    setAddress(newAddress);
    if (newAddress) {
      const response = await handleGetBalance(newAddress);
      setBalance(response);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Select your wallet
        <select
          placeholder="Select your wallet"
          value={address}
          onChange={onChange}
          className="balance"
        >
          <option value={null}>Select your wallet</option>
          {wallets.map((wallet) => (
            <option value={wallet.address} key={wallet.address}>
              {wallet.username}
            </option>
          ))}
        </select>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
