import { Magic } from 'magic-sdk';
import Web3 from 'web3';

import { Solo, Networks, MarketId, BigNumber } from '@dydxprotocol/solo';

// get magic provider
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);
const web3 = new Web3(magic.rpcProvider);

// setup dydx Solo client
const solo = new Solo(web3.currentProvider, Networks.RINKEBY);

//
// dydx
//
export async function dydxGetBalance() {
  const address = (await web3.eth.getAccounts())[0];
  try {
    const balances = await solo.getters.getAccountBalances(
      address, // Account Owner
      new BigNumber(1) // Account Number
    );
    return balances;
  } catch (error) {
    console.log(error);
  }
}

export async function dxdyDeposit(amountInEth) {
  const amount = web3.utils.toWei(amountInEth);
  const address = (await web3.eth.getAccounts())[0];

  // Deposits a certain amount of tokens for some asset.
  // By default resolves when transaction is received by the node - not when mined
  const transactionReceipt = await solo.standardActions.deposit({
    accountOwner: address, // Your address
    marketId: MarketId.ETH,

    // Base units of the token, so 1e18 = 1 ETH
    // NOTE: USDC has 6 decimal places, so 1e6 = 1 USDC
    amount: amount,
  });

  const results = {
    ...transactionReceipt,
    logs: solo.logs.parseLogs(transactionReceipt),
  };

  return results;
}

export async function dxdyWithdraw(amountInEth) {
  const amount = web3.utils.toWei(amountInEth);
  const address = (await web3.eth.getAccounts())[0];

  // Withdraws a certain amount of tokens for some asset.
  // By default resolves when transaction is received by the node - not when mined
  return solo.standardActions.withdraw({
    accountOwner: address, // Your address
    marketId: MarketId.ETH,

    // Base units of the token, so 1e18 = 1 ETH
    // NOTE: USDC has 6 decimal places, so 1e6 = 1 USDC
    amount: amount,
  });
}

export async function dxdyWithdrawToZero() {
  const address = (await web3.eth.getAccounts())[0];

  // Withdraws all of your tokens for some asset.
  // By default resolves when transaction is received by the node - not when mined
  const transactionReceipt = await solo.standardActions.withdrawToZero({
    accountOwner: address, // Your address
    marketId: MarketId.ETH,
  });

  const results = {
    ...transactionReceipt,
    logs: solo.logs.parseLogs(transactionReceipt),
  };

  return results;
}

export async function dydxGetMarkets() {
  const { markets } = await solo.api.getMarkets();
  return markets;
}
