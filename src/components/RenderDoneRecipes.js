import React, { useContext, useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ReceitasContext from '../hooks/ReceitasContext';
import useCopyToClipBoard from '../hooks/useCopyToClipboard';

function RenderDoneRecipes() {
  const { setDoneRecipes, recipesData: { doneRecipes } } = useContext(ReceitasContext);
  const [isLinkInClipBoard, setLinkInClipBoard] = useState(false);
  const [localDataRecipes, setLocalData] = useState([]);
  const { toggleClipMessage } = useCopyToClipBoard(isLinkInClipBoard);

  useEffect(() => {
    const getDoneRecipes = localStorage.getItem('doneRecipes');
    if (getDoneRecipes) {
      const recipesList = JSON.parse(getDoneRecipes);
      setLocalData(recipesList);
    }
  }, []);

  useEffect(() => {
    setDoneRecipes(localDataRecipes);
  }, [localDataRecipes, setDoneRecipes]);

  const getTagsElements = (tagArray, index) => {
    if (tagArray !== null) {
      return tagArray.map((tag) => (
        <p
          key={ `${index}_${tag}` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ));
    }
  };

  const shareUrl = (details) => {
    const initialUrl = (window.location.href).replace('done-recipes', '');
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

  function renderDoneCards() {
    if (doneRecipes !== undefined) {
      return doneRecipes.map((profile, index) => {
        const { id, image, name, nationality, category, alcoholicOrNot,
          doneDate, tags, type } = profile;
        const url = getUrl(id, type);
        if (type === 'food') {
          return (
            <article key={ `${name}_${id}` } className="doneRecipesCard">
              <Link to={ url }>
                <img
                  src={ image }
                  alt={ name }
                  className="doneImg"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { nationality }
                {' '}
                -
                {' '}
                { category }
              </p>
              <Link to={ url }>
                <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              { getTagsElements(tags, index) }
              <button type="button" onClick={ () => shareUrl(url) }>
                { toggleClipMessage(index) }
              </button>
            </article>
          );
        }
        if (type === 'drink') {
          return (
            <article key={ `${name}_${id}` } className="doneRecipesCard">
              <Link to={ url }>
                <img
                  src={ image }
                  alt={ name }
                  className="doneImg"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
              <Link to={ url }>
                <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              <button type="button" onClick={ () => shareUrl(url) }>
                { toggleClipMessage(index) }
              </button>
            </article>
          );
        }
        return (
          <p key={ `erro_${index}` }>
            Xiii... Algo de errado não está certo. Você já tem receitas feitas?
          </p>
        );
      });
    }
    return <h3>loading...</h3>;
  }

  return renderDoneCards();
}

export default RenderDoneRecipes;
