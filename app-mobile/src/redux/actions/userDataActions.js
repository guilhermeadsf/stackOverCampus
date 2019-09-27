export const userLogout = state => async dispatch => {
  await dispatch([
    {
      type: 'USER_LOGOUT',
      payload: state
    }
  ]);
};
