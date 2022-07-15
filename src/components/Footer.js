import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <img
        data-testid="drinks-bottom-btn"
        alt="drink-icon"
        src={ drinkIcon }
      />
      <img
        data-testid="food-bottom-btn"
        alt="meal-icon"
        src={ mealIcon }
      />
    </footer>
  );
}

export default Footer;
