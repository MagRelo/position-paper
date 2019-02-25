import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const assets = [
  ['ANT', '0x077d52B047735976dfdA76feF74d4d988AC25196'],
  ['BAT', '0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914'],
  ['BNT', '0x87d80DBD37E551F58680B4217b23aF6a752DA83F'],
  ['CVC', '0x1C6c712b1F4a7c263B1DBd8F97fb447c945d3b9a'],
  ['DAI', '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14'],
  ['DGX', '0xb92dE8B30584392Af27726D5ce04Ef3c4e5c9924'],
  ['FOAM', '0xf79cb3BEA83BD502737586A6E8B133c378FD1fF2'],
  ['FUN', '0x60a87cC7Fca7E53867facB79DA73181B1bB4238B'],
  ['GNO', '0xe8e45431b93215566BA923a7E611B7342Ea954DF'],
  ['GRID', '0x4B17685b330307C751B47f33890c8398dF4Fe407'],
  ['GUSD', '0xD883264737Ed969d2696eE4B4cAF529c2Fc2A141'],
  ['KIN', '0xb7520a5F8c832c573d6BD0Df955fC5c9b72400F7'],
  ['KNC', '0x49c4f9bc14884f6210F28342ceD592A633801a8b'],
  ['LINK', '0xF173214C720f58E03e194085B1DB28B50aCDeeaD'],
  ['LOOM', '0x417CB32bc991fBbDCaE230C7c4771CC0D69daA6b'],
  ['MANA', '0xC6581Ce3A005e2801c1e0903281BBd318eC5B5C2'],
  ['MKR', '0x2C4Bd064b998838076fa341A83d007FC2FA50957'],
  ['NEXO', '0x069C97DBA948175D10af4b2414969e0B88d44669'],
  ['PAX', '0xC040d51b07Aea5d94a89Bc21E8078B77366Fc6C7'],
  ['QCH', '0x755899F0540c3548b99E68C59AdB0f15d2695188'],
  ['RDN', '0x7D03CeCb36820b4666F45E1b4cA2538724Db271C'],
  ['REN', '0x43892992B0b102459E895B88601Bb2C76736942c'],
  ['REP', '0x48B04d2A05B6B604d8d5223Fd1984f191DED51af'],
  ['RLC', '0xA825CAE02B310E9901b4776806CE25db520c8642'],
  ['RHOC', '0x394e524b47A3AB3D3327f7fF6629dC378c1494a3'],
  ['SALT', '0xC0C59cDe851bfcbdddD3377EC10ea54A18Efb937'],
  ['SNT', '0x1aEC8F11A7E78dC22477e91Ed924Fab46e3A88Fd'],
  ['SPANK', '0x4e395304655F0796bc3bc63709DB72173b9DdF98'],
  ['TKN', '0xb6cFBf322db47D39331E306005DC7E5e6549942B'],
  ['TUSD', '0x4F30E682D0541eAC91748bd38A648d759261b8f3'],
  ['USDC', '0x97deC872013f6B5fB443861090ad931542878126'],
  ['VERI', '0x17e5BF07D696eaf0d14caA4B44ff8A1E17B34de3'],
  ['WBTC', '0x4d2f5cFbA55AE412221182D8475bC85799A5644b'],
  ['WETH', '0xA2881A90Bf33F03E7a3f803765Cd2ED5c8928dFb'],
  ['ZIL', '0x7dc095A5CF7D6208CC680fA9866F80a53911041a'],
  ['ZRX', '0xaE76c84C9262Cdb9abc0C2c8888e62Db8E22A0bF']
];

const assetOptions = assets.map(asset => {
  return {
    label: asset[0],
    value: {
      name: asset[0],
      formFeild: 'toAsset',
      address: asset[1]
    }
  };
});

class ProposalsList extends Component {
  state = {
    fromAsset: null,
    toAsset: null,
    quantity: 0
  };

  //  Proposal form
  onSelectAsset(option) {
    this.setState({
      [option.value.formFeild]: option.value
    });
  }

  async submitProposal() {
    const response = await fetch('/proposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupKey: this.props.groupKey,
        userKey: this.props.selectedAccount,
        quantity: this.state.quantity.number,

        fromAsset: this.state.fromAsset.name,
        toAsset: this.state.toAsset.name
      })
    }).then(response => response.json());
  }

  render() {
    return (
      <section className="add-proposal">
        <h3>Propose a Trade</h3>

        <form action="" className="pure-form proposal-form">
          <p>Move</p>
          <Select
            placeholder="Amount (%)"
            name="quantity"
            id="quantity"
            options={this.props.quantities}
            onChange={this.onSelectAsset.bind(this)}
          />

          <p>of</p>

          <Select
            placeholder="Current Asset"
            name="fromAsset"
            id="fromAsset"
            options={this.props.portfolio}
            onChange={this.onSelectAsset.bind(this)}
          />

          <p>into</p>

          <Select
            placeholder="New Asset"
            name="toAsset"
            id="toAsset"
            options={assetOptions}
            onChange={this.onSelectAsset.bind(this)}
          />

          <button
            type="button"
            className="pure-button pure-button-primary"
            disabled={
              !this.state.quantity ||
              !this.state.fromAsset ||
              !this.state.toAsset
            }
            onClick={this.submitProposal.bind(this)}
          >
            Submit
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount,
    portfolio: state.lobby.portfolio,
    availableAssets: state.lobby.availableAssets,
    quantities: state.lobby.quantities
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
