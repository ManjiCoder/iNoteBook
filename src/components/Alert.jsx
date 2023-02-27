/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function Alert() {
  // eslint-disable-next-line no-shadow
  const { Alert } = useContext(NoteContext);

  return (
    <div>
      {Alert && (
      <div className={`alert alert-${Alert.type}`} role="alert">
        {Alert.msg}
      </div>
      )}
    </div>
  );
}

export default Alert;
