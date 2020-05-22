import React from 'react';
import Button from '../components/Button';

const HomePage = () => {
  return (
    <div>
      <p>Home Page</p>
      <div className="columns">
        <div className="column">
          <Button
            classes="button is-primary"
            text="Boton"
            callback={() => {}}
          ></Button>
        </div>
        <div className="column">Second Column</div>
      </div>
    </div>
  );
};

export default HomePage;
