const algosdk = require('algosdk')
const { server, token, port, seller } = require('./config')

let createAsset = async () => {
    let client = new algosdk.Algodv2(token, server, port)
    let params = await client.getTransactionParams().do()
    let myAccount = algosdk.mnemonicToSecretKey(seller)
    let note = new Uint8Array( Buffer.from("create asset"))
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(myAccount.addr,
        note,
        100,
        3,
        false,
        myAccount.addr,
        myAccount.addr,
        myAccount.addr,
        myAccount.addr,
        'sa',
        'sqoin asset',
        "http://sqoin.us",
        undefined,
        params
        )

        let signedTx=txn.signTxn(myAccount.sk)
        let sentTx= await client.sendRawTransaction(signedTx).do().catch(err=>{
            console.log(JSON.stringify(err))
            process.exit(-1)
        })
        console.log(JSON.stringify(sentTx))
}

createAsset()