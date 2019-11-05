export const userLogout = state => async dispatch => {
  await dispatch([
    {
      type: 'USER_LOGOUT',
      payload: state
    }
  ]);
};

export const addThemes = state => async dispatch => {
  await dispatch([
    {
      type: 'ADD_THEMES',
      payload: state
    }
  ]);
};

export const addEmail = state => async dispatch => {
  await dispatch([
    {
      type: 'ADD_EMAIL',
      payload: state
    }
  ]);
};

export const addName = state => async dispatch => {
  await dispatch([
    {
      type: 'ADD_NAME',
      payload: state
    }
  ]);
};
