import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Login from '../pages/login';

const Routes = () => (
  <Switch>
    <Route exact path="/" element={ <Login /> } />
    <Route exact path="*" element={ <h1>Not Found</h1> } />
  </Switch>
);

export default Routes;
