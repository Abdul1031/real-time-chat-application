import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import MainList from "./pages/MainList";
import CreateEdit from "./pages/CreateEdit";
import Detail from "./pages/Detail";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main style={{ minHeight: "calc(100vh - 100px)" }}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Chat /> : <Login setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route
              path="/signup"
              element={<Signup setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/chat"
              element={
                isLoggedIn ? <Chat /> : <Login setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route
              path="/list"
              element={
                isLoggedIn ? (
                  <MainList />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/create"
              element={
                isLoggedIn ? (
                  <CreateEdit />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/edit/:id"
              element={
                isLoggedIn ? (
                  <CreateEdit />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/detail/:id"
              element={
                isLoggedIn ? (
                  <Detail />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
