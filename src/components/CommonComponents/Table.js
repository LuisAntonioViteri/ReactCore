import { useEffect, useState } from "react"

export default function Table({datos, columnNames,pageSize=10,val,onSelect,onDelete=null}){
    const [page,setPage]=useState(0);
    const [sortedData, setData]=useState([...datos]);
    const [sortColumn, setColumn]=useState();
    const [sortAscending, setSortAscending]=useState(false);
    const [valoresRenderizados,setValores]=useState(0)
    

    /*
    
    const tableBody =()=>{
        return(
            Object.values(sortedData.slice(
                pageSize*page, 
                pageSize*page+ pageSize
                )).map((data,index)=>{
                <tr key={index} >
                    {Object.values(data).map((valores, indexval)=>{
                        <td key={indexval} onClick={()=>onSelect(data)}>{valores.toLocaleString}</td>
                    })}
                    {onDelete &&
                        <td>
                            <button onClick={()=>onDelete(data)}>Delete</button>
                        </td>
                    }
                </tr>
            })

        );
    };
    <tfoot className="table-foot">
                    <tr>
                        <td className="buttons-container">
                            <button onClick={()=>getPreviousPage()}>Anterior</button>
                            <label>{page+1}</label>
                            <button onClick={()=>getNextPage()}>Siguiente</button>
                        </td>
                    </tr>  
                 </tfoot>
    */
    const sortByColumn = (column) =>{
        let templist = [...datos];
        let newSortDirection = !sortAscending;

        if(column!== sortColumn){
            newSortDirection = true;
            setColumn(columnNames);
        };
        if(newSortDirection){
            templist.sort((a,b)=>{

                const x = a[column];
                const y = b[column];
                if(x>y){
                    return 1 ; 
                }
                if(x>y){
                    return -1 ;
                }
                return 0;

            });
        }else{

            templist.sort((a,b)=>{

                const x = a[column];
                const y = b[column];
                if(x>y){
                    return -1 ; 
                }
                if(x>y){
                    return 1 ;
                }
                return 0;

            });
        }
        setSortAscending(newSortDirection);
        setData(templist);
    };
    

    const getPreviousPage = () =>{
        setPage(page - 1 > -1 ? page - 1 : page)

    };

    const getNextPage = () =>{
        setPage(page + 1 < datos.length / pageSize ? page + 1 : page)
    };
    
    return(
        <div className="table-container">
            {datos && 
                 <table className="table">
                 <thead className="table-head">
                     <tr>
                        {columnNames.map((title,index) =>{
                                return(
                                    <th key={index} onClick={()=>sortByColumn(title.toLowerCase())}>
                                        {title.toUpperCase()}
                                    </th>
                                )})
                        }
                        {onDelete && <th>Opciones</th>}
                     </tr>
                 </thead>
                 <tbody className="table-body">
                    {
                       datos.map((element,index)=>{
                            return(
                                <tr key={index}>
                                    { 
                                        Object.values(element).map((valores,index2)=>{
                                            return(
                                               <td key={index2} onClick={()=>onSelect(element)}>{valores}</td>
                                            )
                                    })} 
                                </tr> 
                            )
                        })
                    }
                 </tbody>
                 
                 

             </table>
            
            }
        </div>
    );
}