import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <div className="font-poppins">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
