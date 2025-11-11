import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { UserContext, UsernameProvider } from "./contexts/UserContx";
import AlbumsDisplay from "./pages/AlbumsDisplay";
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
      <UsernameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home">
              <Route index element={<Home />} />
              <Route path="users/:userid/albums" element={<AlbumsDisplay />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UsernameProvider>
    </>
  );
}

export default App;
