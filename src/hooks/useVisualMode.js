import { useState } from "react";

const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  
  const transition = (newMode) => {
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    const length = history.length;
    // console.log('lemght:',length);
    if (length > 1) {
      // console.log('1',history);
      setHistory(history.slice(0,length - 1));
      setMode(history[history.length - 2]);
      // console.log('2',history);
    }
  };

  //[empty, show, create, edit, saving, deleting, confirm]
  return { mode, transition, back };

};

export default useVisualMode;
