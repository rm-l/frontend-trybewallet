export const LOGIN_ACTION = 'LOGIN_ACTION';
// export const SPENDING_ACTION = 'SPENDING_ACTION';

const loginAction = (userInfo) => ({
  type: LOGIN_ACTION,
  userInfo,
});

// const spendingAction = (payload) => ({
//   type: SPENDING_ACTION,
//   payload,
// });

export default (loginAction);
