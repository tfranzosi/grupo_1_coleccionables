import React, { useEffect, useState } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

function ContentRowMovies({products, users}){

    //TOTAL DE PRODUCTOS EN DB
let productCount = {
    title: 'Cantidad de productos',
    color: 'primary', 
    cuantity: products ? products.productCount : 'Cargando...',
    icon: 'fa-gamepad'
}

//TOTAL DE USUARIOS EN DB
let userCount = {
    title:'Cantidad de usuarios', 
    color:'primary', 
    cuantity: users ? users.count : 'Cargando...',
    icon:'fa-user'
}

//TOTAL DE CATEGORIAS
let categoryCount = {
    title:'Cantidad de categorias de productos' ,
    color:'primary',
    cuantity: products ? products.categoryCount : 'Cargando...',
    icon:'fa-flag'
}

//TOTAL DE VENTAS
let salesCount = {
    title:'Total de ventas' ,
    color:'primary',
    cuantity: products ? '$' + parseInt(products.sales).toLocaleString('es-Ar') : 'Cargando...',
    icon:'fa-shopping-cart'
}

let cartProps = [productCount, userCount, categoryCount,salesCount];



    return (
        <div className="row">
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;