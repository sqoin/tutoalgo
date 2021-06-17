const algosdk = require('algosdk')
const { token, server, port, seller, applicationId } = require('./config')

let createCall = async () => {
    let client = new algosdk.Algodv2(token, server, port)
    let params= await client.getTransactionParams().do()
    let myAccount=algosdk.mnemonicToSecretKey(seller)
    let args=[]
    args.push(new Uint8Array(Buffer.from("create")))
    args.push(algosdk.encodeUint64(1000))
    let txn = algosdk.makeApplicationNoOpTxn(myAccount.addr,params,applicationId,args)
    let signedTx= txn.signTxn(myAccount.sk)
    let sentTxn= await client.sendRawTransaction(signedTx).do().catch(err=>{
        console.log(JSON.stringify(err))
        process.exit(-1)
    })
    console.log(JSON.stringify(sentTxn))
}

createCall()