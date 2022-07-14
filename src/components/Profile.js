import React from "react";
import AuthService from "../services/auth.service";
import PortafolioDataService from "../services/portafolio.service";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const createPortafolio = () => { 
    const portafolio = {
      usuarioId:currentUser.Id,
      balance: 100000
    }
    PortafolioDataService.create(portafolio)

  };
  const fondosPortafolio = (fondos) => { 
    if(fondos){
      const portafolio = {
        usuarioId:currentUser.Id,
        balance: 100000
      }
      PortafolioDataService.update(portafolio.portafolioId,portafolio);


    }
   

  };
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <div> 
        
        <button onClick={createPortafolio}>Agregar Fondos</button>
      </div>
      
      <button onClick={fondosPortafolio}>Create Portafolio</button>
    </div>
  );
};
export default Profile;