import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import About from "./pages/about";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log('App - handleSearch called with:', term);
    setSearchTerm(term);
  };

  console.log('App - Current searchTerm:', searchTerm);

  return (
    <div>
      <Navbar />
      <Hero onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;