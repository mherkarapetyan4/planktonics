import axios from "axios";
// import {servicesPaths} from 'config/paths';
import {  appKeyActions} from "../config/actionsKeys"; 

const getLoginFullFilled = (payload) => {
    return {
        type: appKeyActions.LOGIN,
        payload,
    };
};
 
export const isAuth = () => {
    return {
        type: appKeyActions.ISAUTH  
    };
};
 
const getLogoutFullFilled = () => { 
    return {
        type: appKeyActions.LOGOUT
    };
};

export const getLogin = (user) => {
    return (dispatch) => {
        localStorage.setItem("token", user.token)
        dispatch(getLoginFullFilled(user.id))
    };
};
    
export const getLogout = () => {
    return (dispatch) => {
        localStorage.setItem("token", "")
        dispatch(getLogoutFullFilled())
    };
};