import React from 'react';
import { mount, shallow } from 'enzyme';
import ConnectedLoot, { Loot } from './Loot';
import configureStore from 'redux-mock-store';
import { fetchBitcoin } from '../actions/balance';

describe('Loot', () => {
  const mockFetchBitcoin = jest.fn();
  const props = {
    balance: 10,
    bitcoin: { bpi: { USD: { rate: '1,000' } } },
    fetchBitcoin: mockFetchBitcoin
  };
  let loot = shallow(<Loot {...props} />);

  it('renders without crashing', () => {
    expect(loot).toMatchSnapshot();
  });

  describe('when there are valid bitcoin props', () => {
    it('displays the correct bitcoin value', () => {
      expect(loot.find('h3').text()).toEqual('Bitcoin balance: 0.01');
    });
  });

  describe('when mounted', () => {
    beforeEach(() => {
      loot = mount(<Loot {...props} />);
    });

    it('dispatches the `fetchBitcoin()` method it receives from props', () => {
      expect(mockFetchBitcoin).toHaveBeenCalled();
    });
  });
});

describe('ConnectedLoot', () => {
  const initialState = {
    balance: 10,
    bitcoin: { bpi: { USD: { rate: '1,000' } } }
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedLoot store={store} />);
  })

  it('renders the connected(Loot) component', () => {
    expect(container.length).toEqual(1);
  });

  it('maps state to props', () => {
    expect(container.prop('balance')).toEqual(initialState.balance);
    expect(container.prop('bitcoin')).toEqual(initialState.bitcoin);
  });

  it('maps dispatch to props', () => {
    expect(container.prop('fetchBitcoin')).not.toBe(undefined);
  });
});