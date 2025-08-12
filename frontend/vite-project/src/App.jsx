import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MenuList from "./pages/MenuList";
import AddMenu from "./pages/AddMenu";
import "./App.css"; // ✅ We will create this file

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleChange);
    return () => window.removeEventListener("storage", handleChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out successfully!");
    navigate("/login"); // ✅ navigate instead of window.location
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ RestaurantPro</div>
        <div className="navbar-links">
          <Link to="/">Menu List</Link>
          {token ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/add-menu">Add Menu</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<MenuList />} />
          <Route path="/signup" element={<Signup setToken = {setToken}/>} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-menu" element={<AddMenu />} />
        </Routes>
      </div>
    </>
  );
}
import "./App.css"; // ✅ Import the CSS file for styling
import "./index.css"; // ✅ Import the global styles