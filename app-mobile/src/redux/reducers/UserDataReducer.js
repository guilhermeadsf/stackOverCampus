const initialState = {
  docType: '',
  docNumber: '',
  userName: '',
  agencia: '',
  codBanco: '',
  conta: '',
  email: '',
  protocolo: '',
  statusLogado: false,
  password: '',
  phone: '',
  userState: false,
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_DOCTPYE':
      return { ...state, docType: action.payload };
    case 'CHANGE_DOCNUMBER':
      return { ...state, docNumber: action.payload };
    case 'CHANGE_USERNAME':
      return { ...state, userName: action.payload };
    case 'CHANGE_AGENCIA':
      return { ...state, agencia: action.payload };
    case 'CHANGE_COD_BANCO':
      return { ...state, codBanco: action.payload };
    case 'CHANGE_CONTA':
      return { ...state, conta: action.payload };
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payload };
    case 'CHANGE_PROTOCOLO':
      return { ...state, protocolo: action.payload };
    case 'CHANGE_STATUS_LOGADO':
      return { ...state, statusLogado: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CHANGE_PHONE':
      return { ...state, phone: action.payload };
    case 'USER_LOGOUT':
      return { ...state, userState: action.payload };
    default:
      return state;
  }
};

export default UserDataReducer;
