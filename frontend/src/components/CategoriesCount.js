import React, { useState, useEffect } from "react";

function CategoriesCount({products}) {

  let [categories, setCategories] = useState([]);

   useEffect(() => {
    if(Object.keys(products).length > 0){
      setCategories(Object.entries(products.countByCategory))
    }
  },[products]) 

  return (
    <div className="col-lg-4 mb-3">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Cantidad de productos por Categorias
          </h5>
        </div>
        <div className="card-body">
          <div className="row">

          {categories.map((category,i) => {
            return (
            <div key={category[0]+i} className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">{category[0]}: {category[1]}</div>
              </div>
            </div>
            )
          })  }


          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesCount;
