## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

# Solution

For this solution I defined the 3 wallet addresses based on the last 20 bytes of the public keys of these wallets.

Inside the client folder, there is a file `lib/wallets.js` that stores the 3 wallets public and private keys assigned to 3 different users. I took this approach to emulate how an app would work when it connects with a Metamask integration. The client DOES NOT have access to the private key of each wallet, it calls a method `signTransfer` that exists inside `lib/wallets.js` (this would basically like asking Metamask to sign a transfer) that returns a signature. We use this signature to communicate with our server without reveiling the private key of any of the wallets.

In the server, we receive a transfer and obtain the sender address by recovering the public key from the signature and getting the last 20 bytes of that key. This way, we can be sure that the owner of the wallet signed this transfer with his private key and that the wallet from which we have to debit the amount is the one obtained from the public key of that signature.

Wallet Addresses:

- Alice: `ea9b500eb8ede4f424846779b311daefcd9ab5b5`
- Bob: `524cf8e43b8d609c78daf777a8046d730994bc47`
- Carol: `5fa628aeaad4ebb57f3372ec38dcae0f4cd8b10c`
