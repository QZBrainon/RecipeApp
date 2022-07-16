import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import underConstrucion from '../images/under_construction.svg';

function Recipes() {
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <div>
      <Header />
      <img
        src={ underConstrucion }
        alt="site em construção..."
        className="under_construction"
      />
      <h4>mulheres e homens trabalhando!</h4>
      <Footer />
    </div>
  );
}

export default Recipes;
