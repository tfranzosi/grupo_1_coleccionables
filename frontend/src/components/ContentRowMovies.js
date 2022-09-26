import React, { useEffect, useState } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */




function ContentRowMovies(){

    let [products, setProducts] = useState({})
    let [users, setUsers] = useState({})



    //TOTAL DE PRODUCTOS EN DB
let productCount = {
    title: 'Cantidad de productos',
    color: 'primary', 
    cuantity: products.productCount,
    icon: 'fa-gamepad'
}

//TOTAL DE USUARIOS EN DB
let userCount = {
    title:'Cantidad de usuarios', 
    color:'primary', 
    cuantity: users.count,
    icon:'fa-user'
}

//TOTAL DE CATEGORIAS
let categoryCount = {
    title:'Cantidad de categorias de productos' ,
    color:'primary',
    cuantity:products.categoryCount,
    icon:'fa-flag'
}

//TOTAL DE VENTAS
let salesCount = {
    title:'Total de ventas' ,
    color:'primary',
    cuantity:'$100.000',
    icon:'fa-shopping-cart'
}

let cartProps = [productCount, userCount, categoryCount,salesCount];

    useEffect(() => {
        products = fetch('http://localhost:3001/api/products')
        .then(response => response.json())
        .then(json => setProducts(json))

        users = fetch('http://localhost:3001/api/users')
        .then(response => response.json())
        .then(json =>{
            setUsers(json)
        })

    },[])

    return (
 
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;