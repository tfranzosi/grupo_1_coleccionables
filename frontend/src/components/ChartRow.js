import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.sku}</td>
                    <td>{props.name}</td>
                    <td>${parseInt(props.price).toLocaleString('es-Ar')}</td>
                    <td>
                        <ul>
                            {props.categories.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )}
                        </ul>
                    </td>
                    <td>
                        <a className="btn btn-danger" target="_blank" rel="nofollow" href={props.view}>Ver producto</a>
                    </td>
                </tr>
            )
    }
    
        

export default ChartRow;