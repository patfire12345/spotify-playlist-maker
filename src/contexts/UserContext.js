import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from 'react';
import { useHistory } from 'react-router';
import { logout } from '../api/AuthAPI';
import { getProfile } from '../api/UserAPI';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        Login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setUserLoggedIn(user != null);
    }, [user]);

    const Login = useCallback(async () => {
        setUserLoaded(false);
        try {
            const user = await getProfile();
            setUser(user);
        } catch (error) {
            console.log(error);
        }
        setUserLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Logout = useCallback(async () => {
        await logout();
        history.push('/');
        setUser(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider
            value={{ user, userLoggedIn, userLoaded, Logout }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};

export default useUser;
