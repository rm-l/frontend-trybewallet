import { SPENDING_ACTION, FETCH_CURRENCIES_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SPENDING_ACTION:
    return {
      ...state,
      currencies: action.spendingInfo,
      expenses: action.spendingInfo,
      editor: action.spendingInfo,
      idToEdit: action.spendingInfo,
    };
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
