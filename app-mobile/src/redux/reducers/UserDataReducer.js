const initialState = {
  email: '',
  username: '',
  course: '',
  userState: false,
  themes: []
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NAME':
      return { ...state, username: action.payload };
    case 'ADD_EMAIL':
      return { ...state, email: action.payload };
    case 'USER_LOGOUT':
      return { ...state, userState: action.payload };
    case 'ADD_THEMES':
      return { ...state, themes: action.payload };
    case 'ADD_COURSE':
      return { ...state, course: action.payload };
    default:
      return state;
  }
};

export default UserDataReducer;
