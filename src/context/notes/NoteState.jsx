/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import NoteContext from './NoteContext';

function NoteState(props) {
  return (
    // eslint-disable-next-line react/self-closing-comp
    <NoteContext.Provider value={{}}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
