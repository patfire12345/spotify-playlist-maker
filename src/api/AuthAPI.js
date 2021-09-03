import RequestError from './RequestError';

let accessToken = null;
let expirationDate = null;

//gets the token if it exist, else it grabs a new one
export const getToken = async () => {
    const expired = isTokenExpired(expirationDate);
    if (expired) {
        accessToken = await refreshToken();
    }

    return accessToken;
};

export const setToken = async (token) => {
    accessToken = token;
};

export const setTokenExpiration = (expireIn) => {
    expirationDate = Date.now() * expireIn;
};

export const logout = async () => {
    window.localStorage.removeItem('refresh_token');
    accessToken = null;
};

export const refreshToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        const API_URL = process.env.REACT_APP_API_URL;
        const response = await fetch(
            `${API_URL}/api/auth/refresh_token?refresh_token=${refreshToken}`,
        );

        if (!response.ok) throw await RequestError.parseResponse(response);
        const { access_token } = await response.json();
        return access_token;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const isTokenExpired = (exp) => {
    if (!exp) return true;
    return Date.now() > exp;
};

const getRefreshToken = () => {
    const refreshToken = window.localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('Refresh Token Missing');
    return refreshToken;
};
