import { LOGIN, LOGOUT } from "./Auth.Type";
import jwt from "jsonwebtoken";

const istate = {
    _id: null,
    role: null,
    isLogin: false,
    firstName: null,
    lastName: null,
    email: '',
};

const isLoginReducer = (state = istate, action) => {
    const { type, payload } = action;
    if (type === LOGIN) {
        const { firstName, lastName, email, role, _id } = jwt.decode(payload);
        return {
            ...state,
            _id,
            role,
            email,
            lastName,
            firstName,
            isLogin: true,
        }
    } else if (type === LOGOUT) {
        localStorage.removeItem('token');
        return {
            _id: null,
            role: null,
            isLogin: false,
            firstName: null,
            lastName: null,
            email: '',
        }
    } else if (localStorage.getItem('token')) {
        const { exp } = jwt.decode(localStorage.getItem('token'));
        if (new Date(exp * 1000) < Date.now()) {
            console.log(new Date(exp * 1000) > Date.now());
            localStorage.removeItem('token');
            return {
                ...state,
                _id: null,
                role: null,
                isLogin: false,
                firstName: null,
                lastName: null,
                email: '',
            }
        } else {
            const { firstName, lastName, email, role, _id } = jwt.decode(localStorage.getItem('token'));
            return {
                ...state,
                _id,
                role,
                email,
                lastName,
                firstName,
                isLogin: true,
            };
        }
    } else {
        return {
            ...state,
        };
    }
};
export default isLoginReducer;
