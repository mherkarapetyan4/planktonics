import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import withAuth from "../../hoc/withAuth"
import { getUsers } from "../../actions/users"
import { getLogin } from "../../actions/app"
import { Redirect } from "react-router-dom";
function LoginPage(props) {
  const { users, isAuth } = props;
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [inValid, setInvalid] = useState(false)

  useEffect(() => {
    props.dispatch(getUsers())
  }, [])

  // useEffect(() => {
  //     if(isAuth) {

  //     }
  // }, [isAuth])
  if (isAuth) {
    console.log("dasaasd")
    return <Redirect to="/" />
  }
  return <div>
    <select onChange={(({ target }) => setUser(target.value))} defaultValue={'DEFAULT'}>
      <option value="DEFAULT" disabled hidden>Choose here</option>
      {
        users.map((item) => (
          <option key={item.id} value={item.id}>{item.username}</option>
        ))
      }
    </select>
    <input type="password" onChange={(({ target }) => setPassword(target.value))} />

    <button onClick={() => {
      if (user && users[user].password === password) {
        props.dispatch(getLogin(users[user]))
      } else {
        setInvalid(true)
      }
    }}>login </button>

    {inValid && <h2>your password is incorrect</h2>}
  </div>
}

export default  connect(state => ({
  users: state.users.data,
  isAuth: state.app.isAuth
}))(LoginPage) 