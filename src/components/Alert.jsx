/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function Alert() {
  // eslint-disable-next-line no-shadow
  const { Alert } = useContext(NoteContext);

  return (
    <div className="container py-3" style={{ height: '50px' }}>
      {Alert && (
      <div className={`alert alert-${Alert.type}`} role="alert">
        <strong>{Alert.msg}</strong>
      </div>
      )}
    </div>
  );
}

export default Alert;
