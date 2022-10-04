import getCurrencesFromAPI from '../../components/requestAPI';

const LOGIN_ACTION = 'LOGIN_ACTION';
const SPENDING_ACTION = 'SPENDING_ACTION';
const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES_FAIL';
const REMOVE_ITEM = 'REMOVE_ITEM';

export const loginAction = (userInfo) => ({
  type: LOGIN_ACTION,
  userInfo,
});

export const spendingAction = (spendingInfo) => ({
  type: SPENDING_ACTION,
  spendingInfo,
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  item,
});

const actFetchCurrencies = () => ({ type: FETCH_CURRENCIES });

const actFetchCurrenciesSuccess = (payload) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload,
});

const actFetchCurrenciesFail = () => ({
  type: FETCH_CURRENCIES_FAIL,
});

function fetchWithThunk() {
  return async (dispatch) => {
    dispatch(actFetchCurrencies());
    try {
      const result = await getCurrencesFromAPI();
      delete result.USDT;
      dispatch(actFetchCurrenciesSuccess(result));
    } catch (error) {
      dispatch(actFetchCurrenciesFail);
    }
  };
}

function addSpendingFetch(spending) {
  return async (dispatch) => {
    const exchangeRates = await getCurrencesFromAPI();
    delete exchangeRates.USDT;
    dispatch(spendingAction({ ...spending, exchangeRates }));
  };
}

export {
  LOGIN_ACTION,
  SPENDING_ACTION,
  REMOVE_ITEM,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAIL,
  fetchWithThunk,
  addSpendingFetch,
};
