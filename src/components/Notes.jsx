/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const Navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      Navigate('/login');
    }
  }, []);
  //   Later move this to NoteState
  const [note, setNote] = useState({
    id: '', etitle: '', edescription: '', etag: 'General',
  });
    // eslint-disable-next-line no-undef
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };
  const updateNote = (currentNote) => {
    console.log(currentNote);
    setNote({
      id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag,
    });

    ref.current.click();
  };
  return (
    <>
      <AddNote />
      {/* Modal
      <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter the title..."
                    onChange={handleOnChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter the Description..."
                    onChange={handleOnChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter the Tag..."
                    value={note.etag}
                    onChange={handleOnChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" disabled={(note.etitle.length || note.edescription.length) < 5} data-bs-dismiss="modal" onClick={handleOnSubmit}>Save Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {
          // eslint-disable-next-line no-shadow
          notes.map((note) => (<NoteItem key={note._id} note={note} updateNote={updateNote} />))
        }
      </div>
    </>
  );
}

export default Notes;
