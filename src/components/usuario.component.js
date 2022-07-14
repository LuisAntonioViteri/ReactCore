import React, { Component } from "react";
import UsuarioDataService from "../services/usuario.service";


export default class Usuario extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);
    this.onChangeTelefono = this.onChangeTelefono.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.getUsuario = this.getUsuario.bind(this);
    this.updateUsuario = this.updateUsuario.bind(this);
    this.deleteUsuario = this.deleteUsuario.bind(this);
    this.state = {
      currentUsuario: {
        id: null,
        nombre: "",
        apellido: "", 
        telefono: "", 
        mail: "" 
      },
      message: ""
    };
  }
  componentDidMount() {
    
    this.getUsuario(this.props.match.params.id);
  }
  onChangeNombre(e) {
    const nombre = e.target.value;
    this.setState(function(prevState) {
      return {
        currentUsuario: {
          ...prevState.currentUsuario,
          nombre: nombre
        }
      };
    });
  }
  onChangeApellido(e) {
    const apellido = e.target.value;
    
    this.setState(prevState => ({
      currentUsuario: {
        ...prevState.currentUsuario,
        apellido: apellido
      }
    }));
  }
  onChangeTelefono(e) {
    const telefono = e.target.value;
    
    this.setState(prevState => ({
      currentUsuario: {
        ...prevState.currentUsuario,
        telefono: telefono
      }
    }));
  }
  onChangeMail(e) {
    const mail = e.target.value;
    
    this.setState(prevState => ({
      currentUsuario: {
        ...prevState.currentUsuario,
        mail: mail
      }
    }));
  }
  getUsuario(id) {
    UsuarioDataService.get(id)
      .then(response => {
        this.setState({
          currentUsuario: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  updateUsuario() {
    UsuarioDataService.update(
      this.state.currentUsuario.id,
      this.state.currentUsuario
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteUsuario() {    
    UsuarioDataService.delete(this.state.currentUsuario.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/usuarios')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentUsuario } = this.state;
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
                  value={currentUsuario.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  value={currentUsuario.apellido}
                  onChange={this.onChangeApellido}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="number"
                  className="form-control"
                  id="telefono"
                  value={currentUsuario.telefono}
                  onChange={this.onChangeTelefono}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mail">Mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="mail"
                  value={currentUsuario.mail}
                  onChange={this.onChangeMail}
                />
              </div>
              
            </form>
            
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUsuario}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUsuario}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}