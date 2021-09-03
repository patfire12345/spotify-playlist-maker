import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUser from '../contexts/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userLoggedIn, userLoaded } = useUser();

    if (!userLoaded) return null;

    if (!userLoggedIn) {
        const { pathname } = window.location;
        window.localStorage.setItem('redirectUrl', pathname);
    }

    return (
        <Route
            {...rest}
            component={(props) =>
                userLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default PrivateRoute;
