import { Button } from "bootstrap";
import { useState, useEffect } from "react"
import StocksDataService from "../services/stock.service.js";
import PortafolioDataService from "../services/portafolio.service.js";
import BuyedDataService from "../services/buyed.service.js";
import AuthService from "../services/auth.service.js";
import Card from "./CommonComponents/Card.js";
import Table from "./CommonComponents/Table.js"


export default function Dashboard (){

    const [stocksData, setStocksData] = useState([]);
    const [selectedStock,setSelectedSock] = useState(null);
    const [quantity,setQuantity]=useState(1);
    const [modoCompra, setModoCompra]= useState(false)
    const [filtro,setFiltro]=useState(0);
    const [currentPortafolio,setPortafolio]=useState(null);
    const currentUser = AuthService.getCurrentUser();
    const [buyedData,sestBuyedData]=useState([]);
    const [elementoUpdate, setElementoUpdate]=useState(null);
    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    
    //[buyedData,setBuyedData] = useState(null);
  
    

    useEffect(()=>{
        //retrieveStocksData();
        
        
    },[]);

    const retrieveStocksData = () =>{
        StocksDataService.getAll().then(response =>{
            setStocksData(response.data);
            retrievePortafolio();
        }).catch(e => {
            console.log(e);
          });
    };

    const retrievePortafolio=()=>{
        PortafolioDataService.getAll().then(response =>{
            
            response.data.map(elements=>{
                if(elements.id==currentUser.id){
                    setPortafolio(elements.id);
                }
            }).then(retrieveBuyedData(currentPortafolio))
        }).catch(e => {
            console.log(e);
          });
    }
    const retrieveBuyedData=()=>{
        
        
        BuyedDataService.getAll().then(response =>{
            
            response.data.map(elements=>{
                const elementoUpdate = {
                    portafolioId: elements.portafolioId,
                    stockId: elements.stockId
                }
                BuyedDataService.updateRep(elementoUpdate);
                
            })
            sestBuyedData(response.data);
           
        }).catch(e => {
            console.log(e);
          });

    }

    const getStockSelected = (selected) =>{
        setSelectedSock(selected);
        
    };

    const bajarQuantity = ()=>{
        setQuantity(quantity>0 ? quantity-1 : quantity)l
    };
    const subirQuantity = ()=>{
        setQuantity(quantity+1);
    };

    const loadTabla=(filtro)=>{
        if(filtro===0){
            return(
                <Table
                datos={stocksData}
                columnNames={["Id","Nombre","Código","Fecha","Precio"]}
                onSelect={getStockSelected}/>
            )
        }else if(filtro ===1){
            return(
                 
                <Table
                datos={buyedData}
                columnNames={["Cantidad","Fecha","Total","Per","Short","Fecha de entrada","Fecha de salida"]}
                onSelect={getStockSelected}/>
                
                
            )
            
        }
        
    }

    const loadCard=(filtro)=>{
        if(filtro===0){
            return(
                <Card
                    datos={selectedStock}
                    columnNames={["Id","Nombre","Código","Fecha","Precio"]}
                    />
            )
        }else if(filtro ===1){
            return(
                 
                <Card
                    datos={selectedStock}
                    columnNames={["Cantidad","Fecha","Total","Per","Short"]}
                    />
                
                
            )
            
        }
        
    }

    const getCompraVenta=()=>{
        const newBuy = {
            quantity: quantity,
            date: selectedStock.date,
            short: selectedStock.short,
            portafolioId: currentPortafolio,
            stockId :selectedStock.id
        }
        
        console.log(currentPortafolio)
        if(modoCompra){
            BuyedDataService.create(newBuy);
        }else{
            PortafolioDataService.get(currentPortafolio).then(element=>{
                PortafolioDataService.update(currentPortafolio,element.data.balance)
            }
            );
            
        }
        

    };
    
    const cambiarFiltro=()=> {
        if (filtro===2){
            setModoCompra(false)
            setFiltro(0);
        }else if(filtro===1){
            setModoCompra(false)
            setFiltro(2);
        }else if (filtro ===0){
            setFiltro(1)
            setModoCompra(true)
        }


    }
    const onChangeFechaInicio = event =>{
        setFechaInicio(event.target.value)
        console.log(event.target.value)

    }
    const onChangeFechaFinal = event =>{
        setFechaFin(event.target.value)
        console.log(event.target.value)
        

    }
    
    const filtrarDatos=()=>{
        
        const fechaFiltro ={
            dateinf:fechaInicio,
            datesup:fechaFin
        }
        const stocks = StocksDataService.filtroFechasStock(fechaFiltro);
        BuyedDataService.filtroFechas(fechaFiltro);
        console.log(stocks)
    }

    

    
    
    return(
        <div className="dashboard">
            <button className="btn btn-primary btn-block" onClick={()=>{cambiarFiltro()}}>Cambiar tabla</button>
            <input type="text" id="finicio" name="fname" onChange={onChangeFechaInicio}/>
            <input type="text" id="ffinal" name="fname" onChange={onChangeFechaFinal}/>
            
            
             <button className="btn btn-primary btn-block" onClick={()=>{filtrarDatos()}}>Filtrar por fecha</button>

            {loadTabla(filtro)}
            {selectedStock&&
                <div className="container-dasboard">
                <div className="card container">
                    {loadCard(filtro)}
                </div>
                <div className="Botones-Accion">
                    <button onClick={()=>bajarQuantity()}>-</button>
                    <label>{"Cantidad"+quantity}</label>
                    <button onClick={()=>subirQuantity()}>+</button>
                    <button className="btn btn-primary btn-block" onClick={getCompraVenta()}>{modoCompra ? "Comprar":"Vender"}</button>
                </div>
                </div>

                
            }
        </div>
    )

}

