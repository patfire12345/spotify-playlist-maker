import React, { useState } from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import AuthRoute from './routes/AuthRoute';
import { Slider } from './pages/Slider';
import { Error } from './pages/Error';
import { Search } from './pages/Search';

const App = () => {
    return (
        <UserProvider>
            <Routes />
        </UserProvider>
    );
};

const Routes = withRouter(({ location: { pathname } }) => {
    const [tracks, setTracks] = useState([]);
    const [albumImageURL, setAlbumImageURL] = useState([]);

    return (
        <>
            <Switch>
                <AuthRoute path='/auth' />
                <Route exact path='/'>
                    <Search
                        setTracks={setTracks}
                        setAlbumImageURL={setAlbumImageURL}
                    />
                </Route>
                <Route path='/maker'>
                    <Slider tracks={tracks} albumImageURL={albumImageURL} />
                </Route>
                <Route path='/error' component={Error} />
                <Redirect to='/error' />
            </Switch>
        </>
    );
});

export default App;
