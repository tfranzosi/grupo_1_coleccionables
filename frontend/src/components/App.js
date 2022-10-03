import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';

import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import CategoriesCount from './CategoriesCount';
import LastCreatedinDB from './LastCreatedinDB';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import Login from './Login';
import TopBar from './TopBar';
import Footer from './Footer';

const BACKEND_ADDRESS = 'http://localhost:3001';


function App() {
  let [products, setProducts] = useState({})
  let [users, setUsers] = useState({})

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/api/products`)
    .then(response => response.json())
    .then(json => setProducts(json))

    fetch(`${BACKEND_ADDRESS}/api/users`)
    .then(response => response.json())
    .then(json =>{
        setUsers(json)
    })
  },[])

  return (
    <React.Fragment>
      	<div id="wrapper">
            <SideBar />
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                
                <Switch>
                        <Route exact path="/">
                            <TopBar />
                            <ContentWrapper products={products} users={users}/>
                            <Footer />
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
            </div>    
        </div>
    </React.Fragment>
  );
}

export default App;
