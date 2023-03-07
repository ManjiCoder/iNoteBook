/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import NoteContext from './NoteContext';

function NoteState(props) {
  const host = 'http://localhost:5000';
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);
  const [Alert, setAlert] = useState(null);
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  // Get Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmN2MzOWNhMjhlMGM3ODhjMGJiYWJjIn0sImlhdCI6MTY3NzI0NDU0MX0.G2u7ps24NDaSdq2KatF9zmxsqRcODhf-4n2nxUTtpbs',
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmN2MzOWNhMjhlMGM3ODhjMGJiYWJjIn0sImlhdCI6MTY3NzI0NDU0MX0.G2u7ps24NDaSdq2KatF9zmxsqRcODhf-4n2nxUTtpbs',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    setNotes(notes.concat(json.saveNote));
    showAlert('primary', json.msg);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    console.log(`delete note ${id}`);
    // eslint-disable-next-line no-underscore-dangle
    const filterNote = notes.filter((note) => (note._id !== id));
    setNotes(filterNote);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmN2MzOWNhMjhlMGM3ODhjMGJiYWJjIn0sImlhdCI6MTY3NzI0NDU0MX0.G2u7ps24NDaSdq2KatF9zmxsqRcODhf-4n2nxUTtpbs',
      },
    });
    const json = await response.json();
    showAlert('danger', json.msg);
    console.log(json);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmN2MzOWNhMjhlMGM3ODhjMGJiYWJjIn0sImlhdCI6MTY3NzI0NDU0MX0.G2u7ps24NDaSdq2KatF9zmxsqRcODhf-4n2nxUTtpbs',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    showAlert('primary', json.msg);

    // To filter the edit note id and make new notes arr
    const newNotes = JSON.parse(JSON.stringify(notes));
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      // eslint-disable-next-line no-underscore-dangle
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    // eslint-disable-next-line react/self-closing-comp
    <NoteContext.Provider value={{
      notes, setNotes, Alert, showAlert, getNotes, addNote, editNote, deleteNote,
    }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
