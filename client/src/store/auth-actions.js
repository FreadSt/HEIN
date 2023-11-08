import { loginStart, loginSuccess, loginFailure } from './auth-slice';
import { publicRequest } from '../request-methods';

export const login = (user) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await publicRequest.post('/auth/login', user);
      console.log(user, "user")
      dispatch(loginSuccess(response.data));
      window.location.href = '/'
    } catch (err) {
      dispatch(loginFailure());
    }
  };
};