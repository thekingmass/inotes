import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import  Home  from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    {/* the context api is used to ease the problem of drill dowon of the props in the component tree */}
  <NoteState> 
      <Router>
        <Navbar/>
        <Alert message={"This is alert"}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}/>         
          <Route exact path="/about" element={<About />}/>         
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
