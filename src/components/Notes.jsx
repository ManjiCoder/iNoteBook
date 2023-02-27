import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row">
      <h1>Your Notes</h1>
      {notes.map((note) => (<NoteItem note={note} />))}
    </div>
  );
}

export default Notes;
