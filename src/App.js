import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import About from "./components/About"
import NoPage from "./components/NoPage";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import React from 'react'

function App() {
  const [alertData, setAlertData] = useState({ message: 'hello', variant: 'danger' });
  const [show, setShow] = useState(false);

  const updateShow = (message, variant) => {
    setShow(true);
    setAlertData({ message: message, variant: variant });
    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  return (
      <NoteState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar showAlert={show} message={alertData.message} variant={alertData.variant} />}>
              <Route index element={<Home updateShow={updateShow} />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login updateShow={updateShow} />} />
              <Route path="signup" element={<Signup updateShow={updateShow} />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NoteState>

  );
}

export default App;
