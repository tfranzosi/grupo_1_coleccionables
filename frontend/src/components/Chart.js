import React, { useEffect, useState } from 'react';
import ChartRow from './ChartRow';


function Chart ({products}){

    let[tableRowsData, setTableRowsData] = useState([]);
    let[previousPage, setPreviousPage] = useState('');
    let[nextPage, setNextPage] = useState('');

    const fetchApi = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            setTableRowsData(json.products)
            setPreviousPage(json.previousPage);
            setNextPage(json.nextPage);
        })
    }

    const fetchOtherPage = (e, url) => {
        e.preventDefault();
        fetchApi(url);
    }

    useEffect( () => {
        if (Object.keys(products).length > 0){
            setTableRowsData(products.products)
            setPreviousPage(products.previousPage);
            setNextPage(products.nextPage);
        }
    },[products])

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categorias</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableRowsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }
                        </tbody>
                    </table>
                    <a href={previousPage} onClick={ previousPage ? (e) => fetchOtherPage(e, previousPage) : undefined}>Atrás</a>
                    {' - '}  
                    <a href={nextPage} onClick={ nextPage ? (e) => fetchOtherPage(e, nextPage) : undefined}>Adelante</a>
                </div>
            </div>
        </div>

    )
}

export default Chart;