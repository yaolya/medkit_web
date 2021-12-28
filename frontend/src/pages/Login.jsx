import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import GoogleLogin from "react-google-login";
import {refreshTokenSetup} from "../utils/refreshToken";
import UserApi from "../api/UserApi";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        // var id_token = res.getAuthResponse().id_token;
        refreshTokenSetup(res);
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
        UserApi.loginUser(res.profileObj).then(function(response) {
                    const id = response.data.user_id;
                localStorage.setItem('current_user_id', id);
            console.log("user in local storage", Number(localStorage.getItem('current_user_id')))
                })
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login`
        );
    };

    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        <div className="login">
            <h1>MedKit Authorization</h1>
            <div className="login__btn">
                <GoogleLogin
                    clientId={clientID}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{ marginTop: '200px' }}
                    isSignedIn={true}
                />
            </div>
        </div>
    );
};

export default Login;