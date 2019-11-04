const initialState = {
  email: '',
  userState: false,
  themes: []
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMAIL':
      return { ...state, email: action.payload };
    case 'USER_LOGOUT':
      return { ...state, userState: action.payload };
    case 'ADD_THEMES':
      return { ...state, themes: action.payload };
    default:
      return state;
  }
};

export default UserDataReducer;
