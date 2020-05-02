import { usersActions } from "../config/actionsKeys";
import axios from "axios"
const getUsersFullFilled = (payload) => {
    return {
        type: usersActions.GET_USERS,
        payload,
    };
};

export const getUsers = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios.get("./users.json").then(({ data }) => {
            dispatch(getUsersFullFilled(data.users));
            dispatch(endFetching());
        }).catch(() => dispatch(endFetching()));
    };
};
export const startFetching = () => {
    return {
        type: usersActions.START_FETCHING,
    };
};
const endFetching = () => {
    return {
        type: usersActions.END_FETCHING,
    };
};