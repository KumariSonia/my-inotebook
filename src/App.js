import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import About from "./components/About"
import NoPage from "./components/NoPage";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <NoteState>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
