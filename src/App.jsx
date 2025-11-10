import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/comments");

      if (!response.ok) throw new Error("Couldn't fetch data");

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // getData();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
