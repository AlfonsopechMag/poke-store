import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import './App.css';
import Home from './pages/Home/Home';
import { initializeTagManager } from "./utils/gtm";


function App() {
  
  useEffect(() => {
    initializeTagManager();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/poke-store" element={<Home/>} />
      </Routes>
      
    </div>
  );
}

export default App;
