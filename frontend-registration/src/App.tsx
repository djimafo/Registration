import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllAccounts from "./components/users/AllAccounts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Home/>}></Route>
        <Route path="/authentification" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/" element={<AllAccounts/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
