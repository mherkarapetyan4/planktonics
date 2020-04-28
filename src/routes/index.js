import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LazyComponent } from "../containers/LazyComponent";
import { Route } from "react-router-dom"; 

const AuthPage = React.lazy(() => import("pages/Auth"));
const LoginPage = React.lazy(() => import("pages/Login"));

import { LK_MENU_ELEMENTS } from "config/menu";
import { getCurrentUserInfo } from "actions/myData";
import axios from "axios";
import "scss/fonts.scss";
import "scss/backgrounds.scss";
import { hidePopup } from "actions/popup";
import Container from "./Container";

// @withRouter
// @connect((state) => ({
//     isAuth: state.user.isAuth,
// }))
class MainApp extends PureComponent {
     componentDidMount() {
        const { dispatch } = this.props; 

        const token = localStorage.getItem("mgfoms_sessionid");
        if (token) {
            axios.defaults.headers["mgfoms_sessionid"] = token;
        }
        if (
            !(
                window.location.href.indexOf("passport_err") > -1 ||
                window.location.href.indexOf("active_err") > -1
            )
        ) {
            dispatch(getCurrentUserInfo(true));
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.dispatch(hidePopup());
        }
    }

    render() {
        const { isAuth } = this.props;
        return (
            <div>
                {isAuth ? (
                    <Container />
                ) : (
                    <>
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.AUTH_PAGE.path}
                            component={(props) => (
                                <LazyComponent
                                    component={AuthPage}
                                    data={props}
                                />
                            )}
                        />
                        <Route
                            path={LK_MENU_ELEMENTS.LOGIN_PAGE.path}
                            component={(props) => (
                                <LazyComponent
                                    component={LoginPage}
                                    data={props}
                                />
                            )}
                        />
                    </>
                )}
            </div>
        );
    }
} 
export default connect()(withRouter(MainApp));
