import http from "../http-common";
import authHeader from "./auth-header";
//,{headers: authHeader()}

const getAll = () =>{
    return http.get("/stocks");
  };
const get = (id) => {
    return http.get(`/stocks/${id}`);
  };
const create = data => {
    return http.post("/stocks", data);
  };
const update = (id, data) => {
    return http.put(`/stocks/${id}`, data);
  };
const remove = id => {
    return http.delete(`/stocks/${id}`);
  };
const filtroFechasStock=(data)=>{
    return http.get(`stocks/rango`,data);
}

const StocksDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  filtroFechasStock
};
export default StocksDataService;