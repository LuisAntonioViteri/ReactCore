import http from "../http-common";
import authHeader from "./auth-header";
//,{headers: authHeader()}

const getAll = () =>{
    return http.get("/portafolio");
  };
const get = (id) => {
    return http.get(`/portafolio/${id}`);
  };
const create = data => {
    return http.post("/portafolio", data);
  };
const update = (id, data) => {
    return http.put(`/portafolio/${id}`, data);
  };
const remove = id => {
    return http.delete(`/portafolio/${id}`);
  };

const PortafolioDataService = {
  getAll,
  get,
  create,
  update,
  remove
};
export default PortafolioDataService;