/*async function run (runtimeEnv, deployer) {
  console.log('Sample script for ASC has started execution!');
  await deployer.fundLsig('fee-check.teal',
    { funder: deployer.accounts[0], fundingMicroAlgo: 20000000 }, {});

  await deployer.addCheckpointKV('User Checkpoint', 'Fund Contract Account');
  console.log('Sample script for ASC Funding execution has finished!');
}

module.exports = { default: run };
*/

async function run (runtimeEnv,deployer){
 /* let masterAccount= deployer.accountsByName.get("master")
  await deployer.deploySSC(
    'approval_program.teal',
    'clear_state_program.teal',
    {sender: masterAccount,
    localInts:1,
     localBytes:0,
     globalInts:0,
     globalBytes:0},
    {}
  )*/

  let escrow= await deployer.loadLogic('escrow.teal',{})
  console.log(escrow.address())
}

module.exports= {default:run}