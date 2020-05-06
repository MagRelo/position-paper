import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';

import { Solo, Networks, MarketId, BigNumber } from '@dydxprotocol/solo';

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

export async function magicLogin(email) {
  return magic.auth.loginWithMagicLink({
    email,
  });
}

export async function getBalance(publicAddress) {
  // Get user's Ethereum public address
  const signer = provider.getSigner();
  const address = publicAddress || (await signer.getAddress());

  const [network, balance] = await Promise.all([
    provider.getNetwork(),
    provider.getBalance(address).then((balance) => {
      return ethers.utils.formatEther(balance);
    }),
  ]);

  return { network, balance };
}

//
// dydx
//

// init solo
const network = 'RINKEBY';
const solo = new Solo(provider, Networks[network]);

export async function dxdyDeposit() {
  // Deposits a certain amount of tokens for some asset.
  // By default resolves when transaction is received by the node - not when mined
  return solo.standardActions.deposit({
    accountOwner: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5', // Your address
    marketId: MarketId.ETH,

    // Base units of the token, so 1e18 = 1 ETH
    // NOTE: USDC has 6 decimal places, so 1e6 = 1 USDC
    amount: new BigNumber('1e18'),
  });
}

export async function dxdyWithdraw() {
  // Withdraws a certain amount of tokens for some asset.
  // By default resolves when transaction is received by the node - not when mined
  return solo.standardActions.withdraw({
    accountOwner: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5', // Your address
    marketId: MarketId.ETH,

    // Base units of the token, so 1e18 = 1 ETH
    // NOTE: USDC has 6 decimal places, so 1e6 = 1 USDC
    amount: new BigNumber('1e18'),
  });
}

export async function dxdyWithdrawToZero() {
  // Withdraws all of your tokens for some asset.
  // By default resolves when transaction is received by the node - not when mined
  return solo.standardActions.withdrawToZero({
    accountOwner: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5', // Your address
    marketId: MarketId.ETH,
  });
}
