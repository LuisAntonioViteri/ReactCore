import React, { useState, useEffect } from "react";
import UserService from "../services/usuario.service";
const Home = () => {
  /*const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);*/
  return (
    <div className="container">
      <header className="jumbotron">
        <h1>React-Express MVC Website</h1>
        <p>Developed by Luis Viteri</p>
      </header>
    </div>
  );
};
export default Home;