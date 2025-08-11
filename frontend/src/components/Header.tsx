import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/chat">My Chat App</Link>
      </div>
      <div className="header-right">
        {isLoggedIn && userName ? (
          <>
            <span className="profile-link">{userName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="profile-link" to="/">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
