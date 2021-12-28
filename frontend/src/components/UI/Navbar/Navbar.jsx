import React, {useContext} from 'react';
import MyButton from "../button/MyButton";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import {GoogleLogout} from "react-google-login";
import UserApi from "../../../api/UserApi";


const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
        localStorage.removeItem('current_user_id')
        console.log('Logout');
        UserApi.logoutUser().then(function(response) {
            console.log(response);
        })
    }

    const handleClick = e => {
        e.preventDefault();
    }

    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        isAuth
        ?
            <div className="navbar">
                <GoogleLogout
                    clientId={clientID}
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                />
                <div className="navbar__links">
                    <MyButton><Link to="/medicaments">все препараты</Link></MyButton>
                    <MyButton><Link to="/userslist">список покупок</Link></MyButton>
                    <MyButton><Link to="/categories">категории</Link></MyButton>
                    <MyButton><Link to="/profile">профиль</Link></MyButton>
                </div>
            </div>
        :
            <div className="navbar"> </div>
    );
};

export default Navbar;