import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
