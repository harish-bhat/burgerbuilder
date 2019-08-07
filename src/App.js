import React from 'react';
import Layout from './Component/Layout'
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Checkout from './Container/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './Container/Orders/Orders';
function App() { 
  return (
    <div >
     <Layout>
       <Switch>
       <Route path="/checkout" component={Checkout}/>
       <Route path="/orders" component={Orders} />
      <Route path="/" exact component={BurgerBuilder}/>
      </Switch>
       </Layout>
    </div>
  );
}

export default App;
