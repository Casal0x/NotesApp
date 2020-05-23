import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//pages
import HomePage from './pages/HomePage';
import Test from './testPages/Test';
import TestWithHooks from './testPages/TestWithHooks';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/test" component={Test} />
        <Route path="/testwithhooks" component={TestWithHooks} />
      </Switch>
    </Router>
  );
}

export default App;
