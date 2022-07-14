import React, { useState, useEffect } from "react";
import {Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
//import AddUsuario from "./components/AddUsuarios";
import Usuario from "./components/Usuarios";
import UsuariosList from "./components/UsuariosList";
import Dashboard from "./components/Dashboard";

function RequireAuth({children}) {
  const user =AuthService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
return children;
};
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  
  const logOut = () => {
    AuthService.logout();
  };

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/usuarios" className="navbar-brand">
            Luis Viteri
          </a>
          <div className="navbar-nav mr-auto">
            < li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/usuarios"} className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
            )}
          </div>
          {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />

            <Route path="/profile" element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
            }/>
            <Route path="/usuarios" element={
            <RequireAuth>
               <UsuariosList/>
            </RequireAuth>
            }/>
            <Route path="/add" element={<Register/>}/>
            <Route path="/usuarios/:id" element={
              <RequireAuth>
                <Usuario/>
              </RequireAuth>
            }/>
           {/* <Route path={["/", "usuarios/"]} element={<UsuariosList/>} />
            <Route path="add/*" element={<AddUsuario/>} />
            <Route path="/usuarios/:id" element={<Usuario/>} />*/}
          </Routes>
        </div>
      </div>
    );
}

export default App;

