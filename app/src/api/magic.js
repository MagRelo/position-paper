import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
  network: 'kovan',
});
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

  // const balance = ethers.utils.formatEther(
  //   await provider.getBalance(address) // Balance is in wei
  // );

  const [network, balance] = await Promise.all([
    provider.getNetwork(),
    provider.getBalance(address).then((balance) => {
      return ethers.utils.formatEther(balance);
    }),
  ]);

  return { network, balance };
}
