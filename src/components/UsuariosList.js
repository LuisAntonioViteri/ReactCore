import React, { useState, useEffect } from "react";
import UsuarioDataService from "../services/usuario.service";
import { Link } from "react-router-dom";
const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNombre, setSearchNombre] = useState("");
  useEffect(() => {
    retrieveUsuarios();
  }, []);
  //-------Event------
  const onChangeSearchNombre = e => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };
  //--------Llamar a Api GET Usuarios
  const retrieveUsuarios = () => {
    UsuarioDataService.getAll()
      .then(response => {
        setUsuarios(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  //--------Vaciar la información----------
  const refreshList = () => {
    retrieveUsuarios();
    setCurrentUsuario(null);
    setCurrentIndex(-1);
  };
  //--------Guardar Datos de Usuario Seleccionado--------
  const setActiveUsuario = (usuario, index) => {
    setCurrentUsuario(usuario);
    setCurrentIndex(index);
  };
  const removeAllUsuarios = () => {
    UsuarioDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByNombre = () => {
    UsuarioDataService.findByNombre(searchNombre)
      .then(response => {
        setUsuarios(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by nombre"
            value={searchNombre}
            onChange={onChangeSearchNombre}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNombre}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Usuarios List</h4>
        <ul className="list-group">
          {usuarios &&
            usuarios.map((usuario, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUsuario(usuario, index)}
                key={index}
              >
                {usuario.nombre}

              </li>
              
            ))
            }
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllUsuarios}
        >
          Eliminar todos
        </button>
      </div>
      <div className="col-md-6">
        {currentUsuario ? (
          <div>
            <h4>Usuario</h4>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentUsuario.nombre}
            </div>
            <div>
              <label>
                <strong>Apellido:</strong>
              </label>{" "}
              {currentUsuario.apellido}
            </div>
            <div>
              <label>
                <strong>Telefono:</strong>
              </label>{" "}
              {currentUsuario.telefono}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUsuario.email}
            </div>
           
               <Link
              to={"/Usuarios/" + currentUsuario.id}
              className="editbtn"
            >
              Editar
            </Link>
            
            
          </div>
        ) : (
          <div>
            <br />
            <p>Haga click en un usuario...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default UsuariosList;