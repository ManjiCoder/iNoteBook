import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Alert message="This is amazing React Course" />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
