import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'state/store';

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

    // get target contract

    // => fromToken[outputCurrency]

    // select method
    // build params

    // build txn data
    // const targetContract = store.getState().contracts[contract];
    // const txnData = targetContract.methods[method](...params).encodeABI();
    // const targetContractAmount = amount || 0;

    // get portfolio nonce
    // const accountNonce = web3.utils.toBN(
    //   await bouncerProxyInstance.methods
    //     .nonce(selectedAccount)
    //     .call({ from: selectedAccount })
    // );

    // hash & sign message
    // const parts = [
    //   bouncerProxyInstance._address,
    //   selectedAccount,
    //   targetContract._address,
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
    // const BouncerProxy = await new web3.eth.Contract(
    //   bpArtifact.abi,
    //   bpArtifact.networks[networkId].address
    // );

    // // send transaction to portfolio
    // const forwardReceipt = await BouncerProxy.methods
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

function getSwapType(inputCurrency, outputCurrency) {
  if (!inputCurrency || !outputCurrency) {
    return;
  }

  if (inputCurrency === outputCurrency) {
    return;
  }

  if (inputCurrency !== 'ETH' && outputCurrency !== 'ETH') {
    return 'TOKEN_TO_TOKEN';
  }

  if (inputCurrency === 'ETH') {
    return 'ETH_TO_TOKEN';
  }

  if (outputCurrency === 'ETH') {
    return 'TOKEN_TO_ETH';
  }

  return;
}

// this.props.inputCurrency, this.props.outputCurrency

// const type = getSwapType(inputCurrency, outputCurrency);

// const ALLOWED_SLIPPAGE = 0.025;
// const TOKEN_ALLOWED_SLIPPAGE = 0.04;

// const { decimals: inputDecimals } = selectors().getBalance(account, inputCurrency);
// const { decimals: outputDecimals } = selectors().getBalance(account, outputCurrency);
// let deadline;
// try {
//   deadline = await retry(() => getBlockDeadline(web3, 600));
// } catch(e) {
//   // TODO: Handle error.
//   return;
// }
//   switch(type) {
//     case 'ETH_TO_TOKEN':
//       // let exchange = new web3.eth.Contract(EXCHANGE_ABI, fromToken[outputCurrency]);
//       new web3.eth.Contract(EXCHANGE_ABI, fromToken[outputCurrency])
//         .methods
//         .ethToTokenSwapInput(
//           BN(outputValue).multipliedBy(10 ** outputDecimals).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0),
//           deadline,
//         )
//         .send({
//           from: account,
//           value: BN(inputValue).multipliedBy(10 ** 18).toFixed(0),
//         }, (err, data) => {
//           if (!err) {
//             addPendingTx(data);
//             this.reset();
//           }
//         });
//       break;
//     case 'TOKEN_TO_ETH':
//       new web3.eth.Contract(EXCHANGE_ABI, fromToken[inputCurrency])
//         .methods
//         .tokenToEthSwapInput(
//           BN(inputValue).multipliedBy(10 ** inputDecimals).toFixed(0),
//           BN(outputValue).multipliedBy(10 ** outputDecimals).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0),
//           deadline,
//         )
//         .send({ from: account }, (err, data) => {
//           if (!err) {
//             addPendingTx(data);
//             this.reset();
//           }
//         });
//       break;
//     case 'TOKEN_TO_TOKEN':
//       new web3.eth.Contract(EXCHANGE_ABI, fromToken[inputCurrency])
//         .methods
//         .tokenToTokenSwapInput(
//           BN(inputValue).multipliedBy(10 ** inputDecimals).toFixed(0),
//           BN(outputValue).multipliedBy(10 ** outputDecimals).multipliedBy(1 - TOKEN_ALLOWED_SLIPPAGE).toFixed(0),
//           '1',
//           deadline,
//           outputCurrency,
//         )
//         .send({ from: account }, (err, data) => {
//           if (!err) {
//             addPendingTx(data);
//             this.reset();
//           }
//         });
//       break;
//     default:
//       break;
//   }
// }
