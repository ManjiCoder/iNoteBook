/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import NoteContext from '../context/notes/NoteContext';

function NoteItem(props) {
  const { deleteNote } = useContext(NoteContext);

  const {
    title, description, tag, _id,
  } = props.note;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 m-2">
      <div className="card" style={{ width: '18rem' }}>
        <span className="badge bg-primary" style={{ position: 'absolute', right: 0, textTransform: 'capitalize' }}>{tag}</span>
        <div className="card-body">
          <h5 className="card-title d-flex justify-between mt-2">
            {title}
            <span className="icons-container">
              <FaRegTrashAlt onClick={() => deleteNote(_id)} className="icons mx-2" />
              <FaEdit onClick={() => updateNote(note)} className="icons mx-2" />
            </span>
          </h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
