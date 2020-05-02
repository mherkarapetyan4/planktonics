import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux"
import { isAuth, getLogout } from "../actions/app"
export default function withAuth(Component) {
    class Authenticated extends React.Component {
        constructor(props) {
            super(props);
        }
        isLoggedIn() {
            const token = localStorage.getItem('token');
            return !!token
        }

        componentDidMount() {
            if (this.isLoggedIn()) {               
                this.props.dispatch(isAuth())
            } else {  
                this.props.dispatch(getLogout())
            }
        }

        render() { 
            return (
                <div>
                    {this.props.isAuth ? <Component {...this.props} /> : <Redirect to="/login" />}
                </div>
            );
        }
    }
    const mapStateToProps = state => ({
        isAuth: state.app.isAuth
    })
    return connect(mapStateToProps, null)(Authenticated)
}



