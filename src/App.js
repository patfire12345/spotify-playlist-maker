import React, { useState } from "react";
import { Slider } from "./components/Slider";
import { Home } from "./components/Home";

function App() {
  const [start, setStart] = useState(false);

  const changeStart = () => {
    setStart(!start);
  };

  return <div>{start ? <Slider /> : <Home changeStart={changeStart} />}</div>;
}

export default App;
