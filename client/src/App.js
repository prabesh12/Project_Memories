import React from 'react';
import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
      <Navbar />
        <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/auth" exact component = {Auth} />
        </Switch>
      </Container>
    </BrowserRouter>

  );
};

export default App;
