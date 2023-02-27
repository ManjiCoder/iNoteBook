/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import NoteContext from './NoteContext';

function NoteState(props) {
  const s1 = {
    name: 'harry',
    clas: '5B',
  };
  const [state, setState] = useState(s1);

  //   function to change state using Context API
  const update = () => {
    setTimeout(() => {
      setState({
        name: 'carry',
        clas: '10B',
      });
    }, 1000);
  };
  return (
    // eslint-disable-next-line react/self-closing-comp
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
