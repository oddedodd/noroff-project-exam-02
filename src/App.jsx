import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Venue from "./pages/Venue";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/venue/:id" element={<Venue />} />
      </Routes>
    </div>
  );
}

export default App;