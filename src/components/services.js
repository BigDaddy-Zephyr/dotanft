import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = "dev-1629992056264-57088853167476";
const gas = new BN("70000000000000");

// use new NEAR here to avoid needing async/await
export const near = new Near({
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
});



// can now create a new WalletConnection with the created Near object
export const wallet = new WalletConnection(near, "dev-1629992056264-57088853167476");

// a service to get memes from the blockchain
export const getTokensByAccount = () => {
  console.log("WALLET ACCOUNT", wallet.getAccountId())
  return wallet.account().viewFunction("dev-1629992056264-57088853167476", "nft_tokens_for_owner", {"account_id":wallet.getAccountId(),"from_index": "0","limit": 50});
};

export const getTokens = () => {
  return wallet.account().viewFunction("dev-1629992056264-57088853167476", "nft_tokens", {"from_index": "0","limit": 50});
};

export const mintNFT = (arweaveId) => {
  let metadata={"media":arweaveId ,
  "issued_at": Date.now().toString}
  // let perpetual_royalties = "";
  
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "nft_mint",
    gas,
    args: {
      token_id: 'token-' + Date.now(),
      metadata,
    },
    attachedDeposit: utils.format.parseNearAmount("0.5"),
  });
};

// functionCall(contractId, 'nft_mint', {
//   token_id: 'token-' + Date.now(),
//   metadata,
//   perpetual_royalties
// }, GAS, deposit);

// await contractAccount.viewFunction(contractId, 'nft_tokens_for_owner', {
//   account_id: account.accountId,
//   from_index: '0',
//   limit: 50
// });