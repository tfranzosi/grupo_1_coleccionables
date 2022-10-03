import React, { useEffect, useState } from 'react';
const BACKEND_ADDRESS = 'http://localhost:3001';

function LastCreatedinDB(){

    let [product, setProduct] = useState({});
    let [user, setUser] = useState({});

    useEffect( () => {
        fetch(`${BACKEND_ADDRESS}/api/products/last`)
        .then(response => response.json())
        .then(json => {
            setProduct(json)
        })

        fetch(`${BACKEND_ADDRESS}/api/users/last`)
        .then(response => response.json())
        .then(json => {
            setUser(json)
        })  
    },[])

    return(
        <>
            <div className="col-lg-4 mb-3">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto creado</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <p><strong>{product.product_name}</strong></p>
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem'}} src={product.image_url} alt={product.product_name}/>
                        </div>
                        <p>{product.short_description}</p>
                        <a className="btn btn-danger" target="_blank" rel="nofollow" href={product.view}>Detalle producto</a>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 mb-3">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Ultimo usuario creado</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                        <p><strong>{`${user.first_name} ${user.last_name} (${user.user})`}</strong></p>
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem'}} src={user.image_url} alt={user.user}/>
                        </div>
                        <p><strong>Fecha Nacimiento: </strong>{user.birth_date}</p>
                        <p><strong>Sexo: </strong>{user.gender}</p>
                    </div>
                </div>
            </div>
    </>
    )
}

export default LastCreatedinDB;
