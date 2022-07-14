import { useState } from "react";

export default function Card ({datos, columnNames,onSelect = (obj) => console.log(obj),onDelete=null}){

    return(
        
            <div className="card-dash">
                <div className="card-labels">
                 {columnNames.map((columna,index)=>{
                        return(
                            <label key={index}>
                                {columna.toUpperCase()}
                            </label>
                        )
                    })}
                </div>
                <div className="card-data">
                    {Object.values(datos).map((element,index)=>{
                        return(
                            <label key={index}>
                                {element}
                            </label>
                        )
                    })}
                </div>
                
            </div>
        
    )




}