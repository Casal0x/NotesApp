import React from 'react';
import './App.css';

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
