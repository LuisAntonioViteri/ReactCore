import http from "../http-common";
import authHeader from "./auth-header";
const getAll = () =>{
    return http.get("/usuarios",{headers: authHeader()});
  };
const get = (id) => {
    return http.get(`/usuarios/${id}`,{headers: authHeader()});
  };
/*const create = data => {
    return http.post("/usuarios", data);
  };*/
const update = (id, data) => {
    return http.put(`/usuarios/${id}`, data,{headers: authHeader()});
  };
const remove = id => {
    return http.delete(`/usuarios/${id}`,{headers: authHeader()});
  };
const removeAll = () => {
    return http.delete(`/usuarios`,{headers: authHeader()});
  };
const findByName = nombre => {
    return http.get(`/usuarios?nombre=${nombre}`,{headers: authHeader()});
  };
const UsuarioDataService = {
  getAll,
  get,
  //create,
  update,
  remove,
  removeAll,
  findByName
};
export default UsuarioDataService;