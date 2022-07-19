import React from 'react';
import underConstrucion from '../images/under_construction.svg';

function RecipeInProgress() {
  return (
    <main>
      <img
        src={ underConstrucion }
        alt="site em construção..."
        className="under_construction"
      />
      <h4>mulheres e homens trabalhando!</h4>
      <p>E trabalhando demais...</p>
    </main>
  );
}

export default RecipeInProgress;
