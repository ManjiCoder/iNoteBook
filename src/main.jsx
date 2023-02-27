import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NoteState from './context/notes/NoteState';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteState>
      <App />
    </NoteState>
  </React.StrictMode>,
);
