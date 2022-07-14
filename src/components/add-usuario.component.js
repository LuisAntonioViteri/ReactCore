/*import React, { useState } from "react";
import UsuarioDataService from "../services/usuario.service";
export default class AddUsuario extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);
    this.onChangeTelefono = this.onChangeTelefono.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.saveUsuario = this.saveUsuario.bind(this);
    this.newUsuario = this.newUsuario.bind(this);
    this.state = {
      id: null,
      nombre: "",
      apellido: "", 
      telefono: "", 
      email: "" 
      
    };
  }
  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }
  onChangeApellido(e) {
    this.setState({
      apellido: e.target.value
    });
  }
  onChangeTelefono(e) {
    this.setState({
      telefono: e.target.value
    });
  }
  onChangeMail(e) {
    this.setState({
      email: e.target.value
    });
  }
  saveUsuario() {
    var data = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      telefono: this.state.telefono,
      email: this.state.mail

    };
    UsuarioDataService.create(data)
      .then(response => {
        this.setState({
            id: response.data.id,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono: this.state.telefono,
            email: this.state.mail,
            
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newUsuario() {
    this.setState({
      id: null,
      nombre: "",
      apellido: "", 
      telefono: "", 
      email: ""
    });
  }
  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newUsuario}>
                Add
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
                  value={this.state.nombre}
                  onChange={this.onChangeNombre}
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
                  value={this.state.apellido}
                  onChange={this.onChangeApellido}
                  name="apellido"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="number"
                  className="form-control"
                  id="telefono"
                  required
                  value={this.state.telefono}
                  onChange={this.onChangeTelefono}
                  name="telefono"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeMail}
                  name="email"
                />
              </div>
              <button onClick={this.saveUsuario} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}*/