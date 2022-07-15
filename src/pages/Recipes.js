import React from 'react';
import underConstrucion from '../images/under_construction.svg';

function Recipes() {
  return (
    <div>
      <img
        src={ underConstrucion }
        alt="site em construção..."
        className="under_construction"
      />
      <h4>mulheres e homens trabalhando!</h4>
    </div>
  );
}

export default Recipes;
