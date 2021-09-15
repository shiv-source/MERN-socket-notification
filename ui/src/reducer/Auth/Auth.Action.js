
import { LOGIN, LOGOUT } from './Auth.Type';

export const loginUser = (loginDetails) =>{
    return {
        type: LOGIN,
        payload: loginDetails,
    }
}

export const LogoutTheUser = () => {
  return {
    type: LOGOUT, payload: '',
  }
};

