import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { getUsers } from "../../actions/users"
import { getLogin } from "../../actions/app"
import { Redirect } from "react-router-dom";
import Button from "../../components/UI/Button"
import "./Login.scss"
function LoginPage(props) {
  const { users, isAuth } = props;
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [inValid, setInvalid] = useState(false)

  useEffect(() => {
    props.dispatch(getUsers())
  }, [])

  const token = localStorage.getItem('token');
  if (isAuth || !!token) {
    return <Redirect to="/" />
  }
  return <div className="Login__wrapper">
    <div className="Login">
      <select onChange={(({ target }) => setUser(target.value))} defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled hidden>Choose user here</option>
        {
          users.map((item) => (
            <option key={item.id} value={item.id}>{item.username}</option>
          ))
        }
      </select>
      <input placeholder={"type 123456"} type="password" onChange={(({ target }) => setPassword(target.value))} />

      <Button title="login" onClick={() => {
        if (user && users[user].password === password) {
          props.dispatch(getLogin(users[user]))
        } else {
          setInvalid(true)
        }
      }} />

      {inValid && <h2 >your credentials are invalid, password is 123456</h2>}
    </div>

  </div>
}

export default connect(state => ({
  users: state.users.data,
  isAuth: state.app.isAuth
}))(LoginPage)  