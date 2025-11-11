import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { UserContext, UsernameProvider } from "./contexts/UserContx";
import AlbumsDisplay from "./pages/AlbumsDisplay";
import UserAlbums from "./pages/UserAlbums";
function App() {
  return (
    <>
      <UsernameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home">
              <Route index element={<Home />} />
              <Route
                path="users/:userid/albums"
                element={<UserAlbums />}
              ></Route>
              <Route
                path="users/:userid/albums/:albumid"
                element={<AlbumsDisplay />}
              />
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
