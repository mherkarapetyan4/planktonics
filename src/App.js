import React from 'react';
import { connect } from "react-redux"
import { getUsers } from "./actions/users"
import { Route, Switch } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
function App(props) {

  return (
    <div className="App">
      <Switch>
        {/* <Route path="/admin/login" component={Login} exact /> */}
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/" component={HomePage} exact/>
      </Switch>
      {/* <button onClick={() => props.dispatch(getUsers())}>click</button> */}
    </div>
  );
}



export default connect()(App);
