/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

function About() {
  const a = useContext(NoteContext);
  console.log(a.state.clas);
  useEffect(() => {
    a.update();
  }, []);

  return (
    <div>
      My name is
      {`\n${a.state.name}`}
      {' '}
      & my class is
      {`\n${a.state.clas}`}
    </div>
  );
}

export default About;
