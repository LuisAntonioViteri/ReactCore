import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UsuarioDataService from "../services/usuario.service";
const Usuario = props => {
  const { id }= useParams();
  let navigate = useNavigate();
  const initialUsuarioState = {
    id: null,
    nombre: "",
    apellido: "",
    published: false
  };
  const [currentUsuario, setCurrentUsuario] = useState(initialUsuarioState);
  const [message, setMessage] = useState("");
  const getUsuario = id => {
    UsuarioDataService.get(id)
      .then(response => {
        setCurrentUsuario(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id)
      getUsuario(id);
  }, [id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUsuario({ ...currentUsuario, [name]: value });
  };
  
  const updateUsuario = () => {
    UsuarioDataService.update(currentUsuario.id, currentUsuario)
      .then(response => {
        console.log(response.data);
        setMessage("The Usuario was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteUsuario = () => {
    UsuarioDataService.remove(currentUsuario.id)
      .then(response => {
        console.log(response.data);
        navigate("/Usuarios");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentUsuario ? (
        <div className="edit-form">
          <h4>Usuario</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentUsuario.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={currentUsuario.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">telefono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={currentUsuario.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUsuario.email}
                onChange={handleInputChange}
              />
            </div>
            
          </form>
          <button className="btnBorrar" onClick={deleteUsuario}>
            Borrar
          </button>
          <button
            type="submit"
            className="btnActualizar"
            onClick={updateUsuario}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Selecciona un Usuario...</p>
        </div>
      )}
    </div>
  );
};
export default Usuario;