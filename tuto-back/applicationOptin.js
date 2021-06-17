const algosdk = require('algosdk')
const { token, server, port, seller, applicationId } = require('./config')

let applicationOption = async () => {
    let client = new algosdk.Algodv2(token, server, port)
    let params= await client.getTransactionParams().do()
    let myAccount=algosdk.mnemonicToSecretKey(seller)
    let txn = algosdk.makeApplicationOptInTxn(myAccount.addr,params,applicationId)
    let signedTx= txn.signTxn(myAccount.sk)
    let sentTxn= await client.sendRawTransaction(signedTx).do().catch(err=>{
        console.log(JSON.stringify(err))
        process.exit(-1)
    })
    console.log(JSON.stringify(sentTxn))
}

applicationOption()