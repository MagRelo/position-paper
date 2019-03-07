import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'state/store';

import { BigNumber as BN } from 'bignumber.js';
import EXCHANGE_ABI from 'uniswap/exchange.json';
import { exchangeAddresses } from 'uniswap/exchangeData.json';

class ExecuteTrade extends Component {
  state = {
    // isOpen - vote form
    // !isOpen && !isPassed - no trade, clear
    // !isOpen && isPassed && !isExecuted - execute trade form
    // !isOpen && isPassed && isExecuted - trade history
  };

  // Prepare and execute trade
  async executeTrade(proposalId, inFavor) {
    // get web3 and selected account
    const web3 = store.getState().web3.instance;
    const selectedAccount = store.getState().account.selectedAccount;

    // get target contract address
    // => exchangeAddresses.fromToken[outputAsset]
    // select method
    // build params

    // build txn data
    // let exchange = new web3.eth.Contract(EXCHANGE_ABI, exchangeAddresses.fromToken[outputAsset]);
    // const txnData = exchange.methods[method](...params).encodeABI();
    // const targetContractAmount = amount || 0;

    // get portfolio nonce
    // const accountNonce = web3.utils.toBN(
    //   await bouncerProxyInstance.methods
    //     .nonce(selectedAccount)
    //     .call({ from: selectedAccount })
    // );

    // hash & sign message
    // const parts = [
    //   portfolio._address,
    //   selectedAccount,
    //   exchange._address,
    //   web3.utils.toTwosComplement(targetContractAmount),
    //   txnData,
    //   rewardAddress,
    //   web3.utils.toTwosComplement(rewardAmount),
    //   web3.utils.toTwosComplement(accountNonce)
    // ];
    // const message = soliditySha3(...parts);
    // let signature = await web3.eth.sign(message, selectedAccount);

    // create portfolio contract
    // TODO
    // const Portfolio = await new web3.eth.Contract(
    //   portfolio.abi,
    //   portfolio.networks[networkId].address
    // );

    // // send transaction to portfolio
    // const forwardReceipt = await Portfolio.methods
    // .forward(
    //   signature,
    //   signingAccount,
    //   targetContractAddress,
    //   targetContractValue,
    //   txnData,
    //   rewardAddress,
    //   rewardAmount
    // )
    // .send({ from: serverAccount.address });

    // await fetch('/vote', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     groupKey: this.props.groupKey,
    //     userKey: this.props.selectedAccount,
    //     proposalId: proposalId,
    //     inFavor: inFavor
    //   })
    // }).then(response => response.json());
  }

  render() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <p>Success!</p>

        <form action="" className="pure-form">
          <button
            type="button"
            className="pure-button pure-button-primary"
            onClick={this.executeTrade.bind(
              this,
              this.props.groupproposalid,
              true
            )}
          >
            Execute
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecuteTrade);

function getSwapType(inputAsset, outputAsset) {
  if (!inputAsset || !outputAsset) {
    return;
  }

  if (inputAsset === outputAsset) {
    return;
  }

  if (inputAsset !== 'ETH' && outputAsset !== 'ETH') {
    return 'TOKEN_TO_TOKEN';
  }

  if (inputAsset === 'ETH') {
    return 'ETH_TO_TOKEN';
  }

  if (outputAsset === 'ETH') {
    return 'TOKEN_TO_ETH';
  }

  return;
}

async function buildUniswapTxn(web3, inputAsset, outputAsset) {
  const type = getSwapType(inputAsset, outputAsset);
  const ALLOWED_SLIPPAGE = 0.025;
  const TOKEN_ALLOWED_SLIPPAGE = 0.04;

  const inputValue = 0;
  const outputValue = 0;
  const inputDecimals = 0;
  const outputDecimals = 0;
  // const { decimals: inputDecimals } = selectors().getBalance(account, inputAsset);
  // const { decimals: outputDecimals } = selectors().getBalance(account, outputAsset);

  let deadline;
  try {
    // deadline = await retry(() => getBlockDeadline(web3, 600));
  } catch (e) {
    // TODO: Handle error.
    return;
  }

  let exchangeContract = null;
  let txnData = null;

  switch (type) {
    case 'ETH_TO_TOKEN':
      exchangeContract = new web3.eth.Contract(
        EXCHANGE_ABI,
        exchangeAddresses.fromToken[outputAsset]
      );
      txnData = exchangeContract.methods
        .ethToTokenSwapInput(
          BN(outputValue)
            .multipliedBy(10 ** outputDecimals)
            .multipliedBy(1 - ALLOWED_SLIPPAGE)
            .toFixed(0),
          deadline
        )
        .encodeABI();
      break;
    case 'TOKEN_TO_ETH':
      exchangeContract = new web3.eth.Contract(
        EXCHANGE_ABI,
        exchangeAddresses.fromToken[inputAsset]
      );

      txnData = exchangeContract.methods
        .tokenToEthSwapInput(
          BN(inputValue)
            .multipliedBy(10 ** inputDecimals)
            .toFixed(0),
          BN(outputValue)
            .multipliedBy(10 ** outputDecimals)
            .multipliedBy(1 - ALLOWED_SLIPPAGE)
            .toFixed(0),
          deadline
        )
        .encodeABI();
      break;
    case 'TOKEN_TO_TOKEN':
      exchangeContract = new web3.eth.Contract(
        EXCHANGE_ABI,
        exchangeAddresses.fromToken[inputAsset]
      );
      txnData = exchangeContract.methods
        .tokenToTokenSwapInput(
          BN(inputValue)
            .multipliedBy(10 ** inputDecimals)
            .toFixed(0),
          BN(outputValue)
            .multipliedBy(10 ** outputDecimals)
            .multipliedBy(1 - TOKEN_ALLOWED_SLIPPAGE)
            .toFixed(0),
          '1',
          deadline,
          outputAsset
        )
        .encodeABI();
      break;
    default:
      break;
  }

  return txnData;
}
