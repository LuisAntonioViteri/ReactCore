import http from "../http-common";
import authHeader from "./auth-header";
//

const getAll = () =>{
    return http.get("/buyed");
  };
const get = (data) => {
    return http.get(`/buyed/one`,data);
  };
  const getPortafolioBuys = (id) => {
    console.log(id)
    return http.get(`/buyed/search/${id}`);
  };
const create = data => {
    return http.post("/buyed", data);
  }; 
const update = (data) => {
    return http.put(`/buyed/`, data); 
  };
const remove = (data) => {
    return http.delete(`/buyed/`,data);
  }; 

const updateRep = (data)=>{
    return http.put(`/buyed/update`,data);
}
const filtroFechas=(data)=>{
    return http.get(`buyed/rango`,data);
}

const BuyedDataService = {
  getAll, 
  getPortafolioBuys,
  get,
  create,
  update,
  remove,
  updateRep,
  filtroFechas
};
export default BuyedDataService;