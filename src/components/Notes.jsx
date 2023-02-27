/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
  const context = useContext(NoteContext);
  const { notes } = context;
  return (
    <div className="row">
      <h1>Your Notes</h1>
      {notes.map((note) => (<NoteItem key={note._id} note={note} />))}
    </div>
  );
}

export default Notes;
