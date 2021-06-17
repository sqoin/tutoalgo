const algosdk = require('algosdk')
const { token, server, port, seller, applicationId, escrowProgram, escrowAddr, assetId } = require('./config')

let optinToASA = async () => {
    let client = new algosdk.Algodv2(token, server, port)
    let params= await client.getTransactionParams().do()
    let note = new Uint8Array(Buffer.from("optin to asa"))
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(escrowAddr,escrowAddr,
        undefined,undefined,0,note,assetId,params)
    let program= new Uint8Array(Buffer.from(escrowProgram))
    let lsig = algosdk.makeLogicSig(program)
    let signedTxn= algosdk.signLogicSigTransaction(txn,lsig)
    let sentTxn= await client.sendRawTransaction(signedTxn.blob).do().catch(err=>{
        console.log(JSON.stringify(err))
        process.exit(-1)
    })
    console.log(JSON.stringify(sentTxn))
}

optinToASA()