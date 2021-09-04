import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import AuthRoute from './routes/AuthRoute';

const App = () => {
    return (
        <UserProvider>
            <Routes />
        </UserProvider>
    );
};

const Routes = withRouter(({ location: { pathname } }) => (
    <>
        <Switch>
            <AuthRoute path='/auth' />
        </Switch>
    </>
));

export default App;
