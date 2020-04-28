import { combineReducers } from "redux"; 
import { users } from "./users";
import { app } from "./app";
import { usersActions ,appKeyActions } from "../config/actionsKeys";
const rootReducer = combineReducers({ 
    app,
    users
});

const appReducer = (state, action) => {
    if (action.type === appKeyActions.LOGOUT) {
        state = undefined;
    }
    return rootReducer(state, action);
};

export { appReducer };
