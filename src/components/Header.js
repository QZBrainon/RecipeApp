import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const getTitle = () => {
    const pathnamesArr = ['/foods', '/drinks',
      '/profile', '/done-recipes', '/favorite-recipes'];
    const titlesArr = ['Foods', 'Drinks', 'Profile', 'Done Recipes', 'Favorite Recipes'];
    const { pathname } = location;
    const indexTitle = pathnamesArr.indexOf(pathname);
    const indexError = -1;
    if (indexTitle !== indexError) { return titlesArr[indexTitle]; }
  };

  const handleClick = () => {
    history.push('/profile');
  };

  const toggleButton = () => {
    if (isVisible === false) {
      return setIsVisible(true);
    }
    return setIsVisible(false);
  };

  return (
    <header>
      <h1 data-testid="page-title">{ getTitle() }</h1>
      <button type="button" onClick={ handleClick }>
        <img
          data-testid="profile-top-btn"
          alt="img-profile"
          src={ profileIcon }
        />
      </button>
      {
        (location.pathname === '/foods' || location.pathname === '/drinks') && (
          <button
            type="button"
            id="search-toggle-btn"
            onClick={ toggleButton }
          >
            <img
              data-testid="search-top-btn"
              alt="img-search"
              src={ searchIcon }
            />
          </button>)
      }
      <div>
        {
          isVisible && <SearchBar />
        }
      </div>
    </header>
  );
}

export default Header;
