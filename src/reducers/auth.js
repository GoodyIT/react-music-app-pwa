
let DataFromLocal = JSON.parse(localStorage.getItem('userInfo'))
let initialState = {
  isAuthenticated: DataFromLocal.success ? DataFromLocal.success : false,
  user: DataFromLocal ? DataFromLocal : {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      var newState = Object.assign({}, state);
      newState.isAuthenticated = true;
      newState.user = action.payload;
      return newState;
      // eslint-disable-next-line
      break;

    default:
      return state;
      // eslint-disable-next-line
      break;
  }
}

export default auth;