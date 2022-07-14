import React, { useState } from "react";
import UsuarioDataService from "../services/usuario.service";
const AddUsuario = () => {
  const initialUsuarioState = {
    id: null,
      nombre: "",
      apellido: "", 
      telefono: "", 
      email: "" 
  };
  const [usuario, setUsuario] = useState(initialUsuarioState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };
  const saveUsuario = () => {
    var data = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      email: usuario.email
    };
    UsuarioDataService.create(data)
      .then(response => {
        setUsuario({
            id: response.data.id,
            nombre: response.data.nombre,
            apellido: response.data.apellido, 
            telefono: response.data.telefono, 
            email: response.data.email
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const newUsuario = () => {
    setUsuario(initialUsuarioState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Usuario agregado exitosamente!</h4>
          <button className="btn btn-success" onClick={newUsuario}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={usuario.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              required
              value={usuario.apellido}
              onChange={handleInputChange}
              name="apellido"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              required
              value={usuario.telefono}
              onChange={handleInputChange}
              name="telefono"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={usuario.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <button onClick={saveUsuario} className="btn btn-success">
            Guardar 
          </button>
        </div>
      )}
    </div>
  );
};
export default AddUsuario;