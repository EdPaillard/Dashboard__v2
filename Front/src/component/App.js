import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from "./Banner";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <React.Fragment>
      <Router> 
        <Banner />
        <Routes>
          <Route path="/" exact element={<Register />} />
          <Route path="/Dashboard" exact element={<Dashboard />} />
          <Route path="/Login" exact element={<Login />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
