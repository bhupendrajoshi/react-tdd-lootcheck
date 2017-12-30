import bitcoinReducer from './bitcoin';
import { FETCH_BITCOIN } from '../actions/constants';

describe('bitcoinReducer', () => {
  const bitcoinData = { bpi: 'bitcoin price index' };

  it('sets bitcoindata as empty by default', () => {
    const defaultBitcoindata = {};

    expect(bitcoinReducer(undefined, {}))
      .toEqual(defaultBitcoindata);
  });

  it('fetches and sets the bitcoin data', () => {
    expect(bitcoinReducer({}, { type: FETCH_BITCOIN, bitcoin: bitcoinData }))
      .toEqual(bitcoinData);
  });

  it('returns previous bitcoin data when handling unknown action', () => {
    const initialBitcoindata = bitcoinData;

    expect(bitcoinReducer(initialBitcoindata, { type: 'UNKNOWN', bitcoinData: 20 }))
      .toEqual(initialBitcoindata);
  });
});