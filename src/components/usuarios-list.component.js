import React, { Component } from "react";
import UsuarioDataService from "../services/usuario.service";
import { Link } from "react-router-dom";
export default class UsuariosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrieveUsuarios = this.retrieveUsuarios.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUsuario = this.setActiveUsuario.bind(this);
    this.removeAllUsuarios = this.removeAllUsuarios.bind(this);
    this.searchNombre = this.searchNombre.bind(this);
    this.state = {
      usuarios: [],
      currentUsuario: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }
  componentDidMount() {
    this.retrieveUsuarios();
  }
  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;
    this.setState({
      searchNombre: searchNombre
    });
  }
  retrieveUsuarios() {
    UsuarioDataService.getAll()
      .then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveUsuarios();
    this.setState({
      currentUsuario: null,
      currentIndex: -1
    });
  }
  setActiveUsuario(usuario, index) {
    this.setState({
      currentUsuario: usuario,
      currentIndex: index
    });
  }
  removeAllUsuarios() {
    UsuarioDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchNombre() {
    UsuarioDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchNombre, usuarios, currentUsuario, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by nombre"
              value={searchNombre}
              onChange={this.onChangeSearchNombre}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNombre}
              >
                Search
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
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUsuario(usuario, index)}
                  key={index}
                >
                  {usuario.nombre}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsuarios}
          >
            Remove All
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
                to={"/usuarios/" + currentUsuario.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a usuario...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}