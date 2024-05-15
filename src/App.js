import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/poke-store" element={<Home/>} />
      </Routes>
      
    </div>
  );
}

export default App;
