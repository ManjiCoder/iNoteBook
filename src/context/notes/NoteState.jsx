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
    // console.log('Note add successfully');
    // const note = {
    //   _id: '63fb464f67e7ef9ac51d3c91',
    //   user: '63f7c39ca28e0c788c0bbabc',
    //   title,
    //   description,
    //   tag,
    //   date: '2023-02-26T11:45:19.158Z',
    //   __v: 0,
    // };
    setNotes(notes.concat(json.saveNote));
  };

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log(`delete note ${id}`);
    // eslint-disable-next-line no-underscore-dangle
    const filterNote = notes.filter((note) => (note._id !== id));
    setNotes(filterNote);
  };

  // Add a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmN2MzOWNhMjhlMGM3ODhjMGJiYWJjIn0sImlhdCI6MTY3NzI0NDU0MX0.G2u7ps24NDaSdq2KatF9zmxsqRcODhf-4n2nxUTtpbs',
      },
    });
    const json = await response.json();
    console.log(json);
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      // eslint-disable-next-line no-underscore-dangle
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
