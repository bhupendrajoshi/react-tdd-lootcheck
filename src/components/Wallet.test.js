import React from 'react';
import { shallow } from 'enzyme';
import ConnectedWallet, { Wallet } from './Wallet';
import configureStore from 'redux-mock-store';
import { deposit, withdraw } from '../actions/balance';

describe('Wallet', () => {
  const mockDeposit = jest.fn();
  const mockWithdraw = jest.fn();
  const props = { balance: 20, deposit: mockDeposit, withdraw: mockWithdraw }
  const wallet = shallow(<Wallet {...props} />);

  it('renders without crashing', () => {
    expect(wallet).toMatchSnapshot();
  });

  it('display the balance from props', () => {
    expect(wallet.find('.balance').text()).toEqual('Wallet balance: 20');
  });

  it('creates and input to deposit into or withdraw from the balance', () => {
    expect(wallet.find('.input-wallet').exists()).toBe(true);
  });

  describe('when the user types into the wallet input', () => {
    const userBalance = '25';

    beforeEach(() => {
      wallet.find('.input-wallet')
        .simulate('change', { target: { value: userBalance } });
    });

    it('updates the local wallet balance in `state', () => {
      expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
    })

    describe('and the user wants to make a deposit', () => {
      beforeEach(() => {
        wallet.find('.btn-deposit').simulate('click');
      });

      it('dispatches the `deposit()` from props with the local balance', () => {
        expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });

    describe('and the user wants to do a withdraw', () => {
      beforeEach(() => {
        wallet.find('.btn-withdraw').simulate('click');
      });

      it('dispatches the `withdraw()` from props with the local balance', () => {
        expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });
  });
});

describe('ConnectedWallet', () => {
  const initialState = { balance: 100 };
  const mockStore = configureStore();
  let store,container;

  beforeEach(()=>{
      store = mockStore(initialState);
      container = shallow(<ConnectedWallet store={store} /> );  
  })

  it('renders the connected(Wallet) component', () => {
     expect(container.length).toEqual(1);
  });

  it('maps state to props', () => {
     expect(container.prop('balance')).toEqual(initialState.balance);
  });

  it('maps dispatch to props', () => {
    expect(container.prop('deposit')).not.toBe(undefined);
    expect(container.prop('withdraw')).not.toBe(undefined);
  });

  it('dispatches deposit to store', () => {
    container.prop('deposit')(500);
    const action = store.getActions();
    expect(action[0]).toEqual({ "type": 'DEPOSIT', 'deposit': 500 });
  });

  it('dispatches withdraw to store', () => {
    container.prop('withdraw')(100);
    const action = store.getActions();
    expect(action[0]).toEqual({ "type": 'WITHDRAW', 'withdraw': 100 });
  });
});