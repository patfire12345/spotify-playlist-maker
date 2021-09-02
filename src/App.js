import React, { useState } from "react";
import { Slider } from "./components/Slider";
import { Home } from "./components/Home";
import { Recommendation } from "./components/Recommendation";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Error } from "./components/Error";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();
  const [start, setStart] = useState(false);
  const [songsSelected, setSongsSelected] = useState(false);

  const changeStart = () => {
    setStart(!start);
  };

  const selectionDone = () => {
    setSongsSelected(!songsSelected);
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Home changeStart={changeStart} />
          </Route>
          <Route path="/maker">
            {songsSelected ? (
              <motion.div exit={{ x: "100vh" }}>
                <Redirect to="recommendation" />
              </motion.div>
            ) : (
              <Slider selectionDone={selectionDone} />
            )}
          </Route>
          <Route path="/recommendation">
            <Recommendation selectionDone={selectionDone} />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
