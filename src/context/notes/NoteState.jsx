/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import NoteContext from './NoteContext';

function NoteState(props) {
  const noteInitial = [
    {
      _id: '63fb464f67e7ef9ac51d3c91',
      user: '63f7c39ca28e0c788c0bbabc',
      title: 'Self Improvment',
      description: 'Early to bed, Early to rise',
      tag: 'personal',
      date: '2023-02-26T11:45:19.158Z',
      __v: 0,
    },
    {
      _id: '63fb464f67e7ef9ac51d3c93',
      user: '63f7c39ca28e0c788c0bbabc',
      title: 'Self Improvment',
      description: 'Early to bed, Early to rise',
      tag: 'personal',
      date: '2023-02-26T11:45:19.534Z',
      __v: 0,
    },
    {
      _id: '63fb464f67e7ef9ac51d3c95',
      user: '63f7c39ca28e0c788c0bbabc',
      title: 'Self Improvment',
      description: 'Early to bed, Early to rise',
      tag: 'personal',
      date: '2023-02-26T11:45:19.978Z',
      __v: 0,
    },
    {
      _id: '63fb465067e7ef9ac51d3c97',
      user: '63f7c39ca28e0c788c0bbabc',
      title: 'Self Improvment',
      description: 'Early to bed, Early to rise',
      tag: 'personal',
      date: '2023-02-26T11:45:20.410Z',
      __v: 0,
    },
    {
      _id: '63fcfa66522af85ced6ab6a7',
      user: '63f7c39ca28e0c788c0bbabc',
      title: 'Mytitle',
      description: 'Early to bed, Early to rise',
      tag: 'personal',
      date: '2023-02-27T18:45:58.445Z',
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(noteInitial);
  const [Alert, setAlert] = useState(null);
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO: API Call
    console.log('Note add successfully');
    const note = {
      _id: '63fb464f67e7ef9ac51d3c91',
      user: '63f7c39ca28e0c788c0bbabc',
      title,
      description,
      tag,
      date: '2023-02-26T11:45:19.158Z',
      __v: 0,
    };
    setNotes(notes.concat(note));
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
  const editNote = () => {
    // TODO: API Call
  };
  return (
    // eslint-disable-next-line react/self-closing-comp
    <NoteContext.Provider value={{
      notes, setNotes, Alert, showAlert, addNote, deleteNote, editNote,
    }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
