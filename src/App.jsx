import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <NoteState>
        <Navbar />
        <Alert message="This is amazing React Course" />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
