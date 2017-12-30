import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBitcoin } from '../actions/bitcoin';

export class Loot extends Component {
  componentDidMount() {
    this.props.fetchBitcoin();
  }

  computeBitcoin = () => {
    const { bitcoin, balance } = this.props;

    if (Object.keys(bitcoin).length === 0) return '';

    return balance / parseInt(bitcoin.bpi.USD.rate.replace(',', ''), 10);
  }

  render() {
    return (
      <h3>Bitcoin balance: {this.computeBitcoin()}</h3>
    );
  }
}

const mapStateToProps = state => {
  return { balance: state.balance, bitcoin: state.bitcoin }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBitcoin: () => dispatch(fetchBitcoin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loot);