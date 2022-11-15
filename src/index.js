import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";
import { 
  Home,
  Register, 
  TopUp,
  Transfer
} from "./components";

ReactDOM.render(
  <Router>
    {/* <Navigation /> */}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topup/:id" element={<TopUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    {/* <Footer /> */}
  </Router>,

  document.getElementById("root")
);