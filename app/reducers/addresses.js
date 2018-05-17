import addresses from '../data/addresses';

const initialState = {
  address: addresses[0],
  addressIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_ADDRESS': { // Must rewrite
      const index = state.addressIndex ? 0 : 1;
      return {
        ...state,
        address: addresses[index],
        addressIndex: index,
      };
    }
    default:
      return state;
  }
};

export default reducer;
