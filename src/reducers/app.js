import { appKeyActions } from "../config/actionsKeys";

const initial = {
    isAuth: false,
    userId: null
};

export function app(state = initial, action) {
    switch (action.type) {
        case appKeyActions.LOGIN: {
            return {
                ...state,
                isAuth: true,
                userId: action.payload
            };
        }

        case appKeyActions.ISAUTH: {
            return {
                ...state,
                isAuth: true, 
            };
        }
        case appKeyActions.LOGOUT: {
            return {
                ...state,
                isAuth: false,
                userId: null
            };
        }
        default:
            return state;
    }
}
