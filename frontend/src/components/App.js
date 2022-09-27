import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';

import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import CategoriesCount from './CategoriesCount';
import LastCreatedinDB from './LastCreatedinDB';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import Login from './Login';

function App() {
  let [products, setProducts] = useState({})
  let [users, setUsers] = useState({})

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
    .then(response => response.json())
    .then(json => setProducts(json))

    fetch('http://localhost:3001/api/users')
    .then(response => response.json())
    .then(json =>{
        setUsers(json)
    })
  },[])

  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
          <Switch>
                <Route exact path="/">
                    <ContentWrapper products={products} users={users}/>
                </Route>
                <Route path="/CategoriesCount">
                    <CategoriesCount products={products} />
                </Route>
                <Route path="/LastCreatedinDB">
                    <LastCreatedinDB />
                </Route>
                <Route path="/ContentRowMovies">
                    <ContentRowMovies products={products} users={users}/>
                </Route>
                <Route path="/Login">
                    <Login />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;
