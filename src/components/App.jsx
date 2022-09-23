import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Keeper from "./Keeper";
import NoteState from "../context/notes/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Navigate
} from "react-router-dom";

function App() {

  return (
    <div>
      <NoteState>
        <Router>
          <Header />
            <Routes>
              {/*---- Rout 1 ----*/}
              <Route exact path="/" element={<Home />} />
              {/*---- Rout 2 ----*/}
              <Route exact path="/login" element={<Login />} />
              {/*---- Rout 3 ----*/}
              <Route exact path="/register" element={<Register />} />
              {/*---- Rout 4 ----*/}
              <Route exact path="/notes" element={<Keeper />}
              />
            </Routes>
          <Footer />
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
