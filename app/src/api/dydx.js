import { Magic } from 'magic-sdk';
import Web3 from 'web3';

import { Solo, Networks, MarketId, BigNumber } from '@dydxprotocol/solo';

// get magic provider
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
  network: 'kovan',
});
const web3 = new Web3(magic.rpcProvider);

// setup dydx Solo client
const solo = new Solo(web3.currentProvider, Networks.KOVAN);

//
// dydx
//
export async function dydxGetBalance() {
  const address = (await web3.eth.getAccounts())[0];
  try {
    const balanceArray = await solo.getters.getAccountBalances(
      address, // Account Owner
      new BigNumber(0) // Account Number
    );

    // => "Wrapped Ether"
    balanceArray[0].name = await solo.token.getName(
      balanceArray[0].tokenAddress
    );
    balanceArray[0].eth = web3.utils.fromWei(balanceArray[0].wei.toString());

    balanceArray[1].name = 'Test DAI';
    // balanceArray[1].name = await solo.token.getName(
    //   balanceArray[1].tokenAddress // '0xC4375B7De8af5a38a93548eb8453a498222C4fF2'
    // );
    // Error: overflow (operation="setValue", fault="overflow",
    // details="Number can only safely store up to 53 bits")
    balanceArray[1].eth = web3.utils.fromWei(balanceArray[1].wei.toString());

    // => "Test USDC"
    balanceArray[2].name = await solo.token.getName(
      balanceArray[2].tokenAddress
    );
    balanceArray[2].eth = web3.utils.fromWei(balanceArray[2].wei.toString());

    return balanceArray;
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
