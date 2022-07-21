import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function useFavoriteButton() {
  function setStorageFavorite() {
    console.log('vamos dançar quadrilha');
  }

  function getFavoriteButton(isFavorite) {
    return (
      (isFavorite)
        ? <img src={ blackHeartIcon } alt="favorite icon" />
        : <img src={ whiteHeartIcon } alt="non-favorite icon" />
    );
  }

  const useFavoriteButtonData = { setStorageFavorite, getFavoriteButton };

  return useFavoriteButtonData;
}

export default useFavoriteButton;
