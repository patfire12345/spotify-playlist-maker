import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import AuthRoute from './routes/AuthRoute';
import Slider from './pages/Slider';

const App = () => {
    return (
        <UserProvider>
            <Routes />
            <Slider />
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
