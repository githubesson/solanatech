const solweb3 = require('@solana/web3.js');
const prompt = require('prompt-sync')();
const fs = require('fs');
var base58 = require('bs58');

//establish connection with rpc
const Solana = new solweb3.Connection(
    "https://api.mainnet-beta.solana.com"
);

console.log(`esson walletgen`);
const walletnum = prompt("How many wallets/keypairs do you want to generate?: ");
const save = prompt("Save to txt? (yes/no): ");

for(i = 0; i < walletnum; i++){

    //gen wallet/keypair

    const keypair = solweb3.Keypair.generate();

    //turn private key uint8 array to bs58 string

    decode = base58.encode(keypair.secretKey)

    console.log(`Public Key ${i+1}:`, keypair.publicKey.toString());
    console.log(`Private Key ${i+1}:`, decode);

    let keypairsave = keypair.publicKey.toString() + ", " + decode + "\n"

    //save to file

    if(save == "yes"){
        fs.appendFile('keypairs.txt', keypairsave, err => {
            if (err) {
              console.error(err)
              return
            }
        })
        console.log(`saved ${i+1} keypair`);
    }

    else console.log('done');
}