import "./App.css";
import Register from "./components/register";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Error from "./components/errorpages/Error";
function App() {
  return (
    <BrowserRouter basename="/full-stack-app-react">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/error" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
