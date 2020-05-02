import { usersActions } from "../config/actionsKeys"; 

const initial = {
    data: [],
    isFetching: false
};

export function users(state = initial, action) {
    switch (action.type) {
        case usersActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }      
        case usersActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }      
        case usersActions.GET_USERS: {
            return {
                ...state,
                data: action.payload,
            };
        }      
        default:
            return state;
    }
}
