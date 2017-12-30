import balanceReducer from './balance';
import balanceReducer2 from './balance';
import * as constants from '../actions/constants';

describe('balanceReducer', () => {
  describe('when initializing', () => {
    const balance = 10;

    it('sets balance as zero by default', () => {
      const defaultBalance = 0;

      expect(balanceReducer(undefined, {}))
        .toEqual(defaultBalance);
    });

    it('sets a balance', () => {
      expect(balanceReducer(undefined, { type: constants.SET_BALANCE, balance }))
        .toEqual(balance);
    });
  });

  it('returns previous balance when handling unknown action', () => {
    const initialBalance = 5;

    expect(balanceReducer(initialBalance, { type: 'UNKNOWN', balance: 20 }))
      .toEqual(initialBalance);
  });

  it('deposits into the balance', () => {
    const deposit = 10;
    const initialBalance = 5;

    expect(balanceReducer(initialBalance, { type: constants.DEPOSIT, deposit }))
      .toEqual(initialBalance + deposit);
  });

  it('withdraws from the balance', () => {
    const withdraw = 10;
    const initialBalance = 5;

    expect(balanceReducer(initialBalance, { type: constants.WITHDRAW, withdraw }))
      .toEqual(initialBalance - withdraw);
  });
});