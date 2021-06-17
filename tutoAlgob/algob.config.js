// NOTE: below we provide some example accounts.
// DON'T this account in any working environment because everyone can check it and use
// the private keys (this accounts are visible to everyone).

// NOTE: to be able to execute transactions, you need to use an active account with
// a sufficient ALGO balance.

/**
   Check our /docs/algob-config.md documentation (https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md) for more configuration options and ways how to
  load a private keys:
  + using mnemonic
  + using binary secret key
  + using KMD daemon
  + loading from a file
  + loading from an environment variable
  + ...
*/

// ## ACCOUNTS USING mnemonic ##
const { mkAccounts, algodCredentialsFromEnv } = require("@algo-builder/algob");
let accounts = mkAccounts([{
  // This account is created using `make setup-master-account` command from our
  // `/infrastructure` directory. It already has many ALGOs
  name: "master",
  addr: "URD6AQEXE4C22Y4FAUA4XIBWAKHLRYKRUJEV2KZ3EVUSPG4USYNKJUBNAY",
  mnemonic: "tiny surface rare dragon bunker hollow text erode pistol angry pottery nasty pattern board leaf hood reflect brother athlete ignore belt flight proof abstract join"
}]);

// ## ACCOUNTS loaded from a FILE ##
// const { loadAccountsFromFileSync } = require("@algo-builder/algob");
// const accFromFile = loadAccountsFromFileSync("assets/accounts_generated.yaml");
// accounts = accounts.concat(accFromFile);



/// ## Enabling KMD access
/// Please check https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md#credentials for more details and more methods.

// process.env.$KMD_DATA = "/path_to/KMD_DATA";
// let kmdCred = KMDCredentialsFromEnv();



// ## Algod Credentials
// You can set the credentials directly in this file:

let defaultCfg = {
  host: "https://algorandtestnet.sqoin.us",
  port: 443,
  token: "9a68ba4c1c8d6170886092fc4cad522652fa549598df5121be0ad5c677061d41",
  accounts: accounts,
  // if you want to load accounts from KMD, you need to add the kmdCfg object. Please read
  // algob-config.md documentation for details.
  // kmdCfg: kmdCfg,
};

// You can also use Environment variables to get Algod credentials
// Please check https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md#credentials for more details and more methods.
// Method 1
process.env.ALGOD_ADDR = "127.0.0.1:4001";
process.env.ALGOD_TOKEN = "algod_token";
let algodCred = algodCredentialsFromEnv();


let envCfg = {
 host: algodCred.host,
 port: algodCred.port,
 token: algodCred.token,
 accounts: accounts
}


module.exports = {
  networks: {
    default: defaultCfg,
    prod: envCfg
  }
};
