import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { setToken, setTokenExpiration } from '../api/AuthAPI';
import useQuery from '../hooks/useQuery';

//This is the route for the redirect after OAuth login. When redirected here by the API, it will attempt to load in the user and  then redirect the user back to original route where user tried to login.
const AuthRoute = () => {
    let redirectUrl;
    const query = useQuery();
    const accessToken = query.get('access_token');
    const refreshToken = query.get('refresh_token');

    if (accessToken && refreshToken) {
        setToken(accessToken);
        setTokenExpiration(query.get('expire_in'));

        window.localStorage.setItem('refresh_token', refreshToken);
        redirectUrl = window.localStorage.getItem('redirectUrl') || '/';
    } else {
        redirectUrl = '/login';
    }

    useEffect(() => {
        return window.localStorage.removeItem('redirectUrl');
    }, [query]);

    return <Redirect to={redirectUrl} />;
};

export default AuthRoute;
