const algosdk = require('algosdk')
const { token, server, port, seller, applicationId, escrowAddr, assetId } = require('./config')

let sendAssetToEscrow = async () => {
    let client = new algosdk.Algodv2(token, server, port)
    let params= await client.getTransactionParams().do()
    let myAccount=algosdk.mnemonicToSecretKey(seller)
    let note = new Uint8Array(Buffer.from("send asset to escrow"))
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(myAccount.addr,escrowAddr,undefined,undefined,1,note,assetId,params)
    let signedTx= txn.signTxn(myAccount.sk)
    let sentTxn= await client.sendRawTransaction(signedTx).do().catch(err=>{
        console.log(JSON.stringify(err))
        process.exit(-1)
    })
    console.log(JSON.stringify(sentTxn))
}

sendAssetToEscrow()