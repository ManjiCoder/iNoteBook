/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  //   Later move this to NoteState
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });
  // eslint-disable-next-line no-undef
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
  };
  return (
    <>
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title :</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter the title..."
            onChange={handleOnChange}
            value={note.title}
            min="5"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description :</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter the Description..."
            onChange={handleOnChange}
            value={note.description}
            min="5"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag :</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter the Tag..."
            value={note.tag}
            onChange={handleOnChange}
            required
          />
        </div>
        <button disabled={(note.title.length && note.description.length) < 5} type="submit" className="btn btn-primary" onClick={handleOnSubmit}>Add Note</button>
      </form>
    </>
  );
}

export default AddNote;
