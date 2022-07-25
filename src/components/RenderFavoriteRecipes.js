import React, { useContext, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ReceitasContext from '../hooks/ReceitasContext';
import useCopyToClipBoard from '../hooks/useCopyToClipboard';
import useFavoriteButton from '../hooks/useFavoriteButton';

function RenderFavoriteRecipes() {
  const { recipesData: { favoriteRecipes } } = useContext(ReceitasContext);
  const [isLinkInClipBoard, setLinkInClipBoard] = useState(false);
  const { toggleClipMessage } = useCopyToClipBoard(isLinkInClipBoard);
  const { getFavButton } = useFavoriteButton();

  const shareUrl = (details) => {
    const initialUrl = (window.location.href).replace('favorite-recipes', '');
    const url = initialUrl + details;
    clipboardCopy(url);
    return setLinkInClipBoard(!isLinkInClipBoard);
  };

  const getUrl = (id, type) => {
    if (type === 'food') {
      const url = `foods/${id}`;
      return url;
    }
    const url = `drinks/${id}`;
    return url;
  };

  if (favoriteRecipes !== undefined) {
    return favoriteRecipes.map((recipe, index) => {
      const { id, type, image, name, category, nationality, alcoholicOrNot } = recipe;
      const url = getUrl(id, type);
      console.log(url);
      if (type === 'food') {
        return (
          <article className="doneRecipesCard" key={ `${name}_${index}` }>
            <Link to={ url }>
              <img
                src={ image }
                alt={ `${name}_${index}` }
                className="doneImg"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link to={ url }>
              <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {nationality}
              {' '}
              -
              {' '}
              {category}
            </p>
            <button type="button" onClick={ () => shareUrl(url) }>
              { toggleClipMessage(index) }
            </button>
            {getFavButton(id, index)}
          </article>
        );
      }
      if (type === 'drink') {
        return (
          <article className="doneRecipesCard" key={ `${name}_${index}` }>
            <Link to={ url }>
              <img
                src={ image }
                alt={ `${name}_${index}` }
                className="doneImg"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link to={ url }>
              <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {category}
              {' '}
              -
              {' '}
              {alcoholicOrNot}
            </p>
            <button type="button" onClick={ () => shareUrl(url) }>
              { toggleClipMessage(index) }
            </button>
            {getFavButton(id, index)}
          </article>
        );
      }
      return <h3 key={ `warning_${index}` }>Como você veio parar aqui?</h3>;
    });
  }
  return <h3>loading...</h3>;
}

export default RenderFavoriteRecipes;
