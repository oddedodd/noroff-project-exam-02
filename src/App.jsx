import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import Venue from "./pages/Venue";
import BookVenue from "./pages/BookVenue";
import AddVenue from "./pages/AddVenue";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/venue/:id" element={<Venue />} />
        <Route path="/venue/:id/book" element={<BookVenue />} />
        <Route path="/venue/add" element={<AddVenue />} />
      </Routes>
    </div>
  );
}

export default App;