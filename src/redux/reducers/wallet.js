import { SPENDING_ACTION, FETCH_CURRENCIES_SUCCESS, REMOVE_ITEM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SPENDING_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.spendingInfo],
    };
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case REMOVE_ITEM:
    return {
      ...state,
      expenses: action.item,
    };
  default:
    return state;
  }
}

export default wallet;
