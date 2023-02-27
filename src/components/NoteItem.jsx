import React from 'react';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

function NoteItem(props) {
  // eslint-disable-next-line react/destructuring-assignment, react/prop-types
  const { title, description, tag } = props.note;
  return (
    <div className="col-md-3 m-2">
      <div className="card" style={{ width: '18rem' }}>
        <span className="badge bg-primary" style={{ position: 'absolute', right: 0, textTransform: 'capitalize' }}>{tag}</span>
        <div className="card-body">
          <h5 className="card-title d-flex justify-between mt-2">
            {title}
            <span className="icons-container">
              <FaRegTrashAlt className="icons mx-2" />
              <FaEdit className="icons mx-2" />
            </span>
          </h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
