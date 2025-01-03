import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Signup from "../components/signup/signup";
import Signin from "../components/signin/signin";
import Todo from "../components/todo/todo";

import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<div className="App"><Signup /></div>} />
        <Route path="/signin" element={<div className="App"><Signin /></div>}  />
        <Route path="/todo" element={<div className="App"><Todo /></div>}  />
      </Routes>
    </Router>
  );
}

export default App;
