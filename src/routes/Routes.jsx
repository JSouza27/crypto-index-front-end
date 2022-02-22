import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Home from '../pages/home/Index';
import Login from '../pages/login/Index';
import NotFound from '../pages/notFound/Index';
import UpdateQuote from '../pages/updateQuote/Index';

const Routes = () => (
  <Switch>
    <Route exact path="/login" element={ <Login /> } />
    <Route exact path="/" element={ <Home /> } />
    <Route exact path="/update-quote" element={ <UpdateQuote /> } />
    <Route exact path="*" element={ <NotFound /> } />
  </Switch>
);

export default Routes;
