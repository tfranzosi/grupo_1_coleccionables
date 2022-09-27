import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';

import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import CategoriesCount from './CategoriesCount';
import LastCreatedinDB from './LastCreatedinDB';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import SearchMovies from './SearchMovies';

function App() {
  let [products, setProducts] = useState({})
  let [users, setUsers] = useState({})

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
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
          <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/CategoriesCount">
                    <CategoriesCount />
                </Route>
                <Route path="/LastCreatedinDB">
                    <LastCreatedinDB />
                </Route>
                <Route path="/ContentRowMovies">
                    <ContentRowMovies />
                </Route>
                <Route path="/Search">
                    <SearchMovies />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;
