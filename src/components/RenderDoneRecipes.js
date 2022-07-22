import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';
import shareIcon from '../images/shareIcon.svg';

function RenderDoneRecipes() {
  const { setDoneRecipes, recipesData: { doneRecipes } } = useContext(ReceitasContext);
  const [localDataRecipes, setLocalData] = useState([]);

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

  function renderDoneCards() {
    if (doneRecipes !== undefined) {
      return doneRecipes.map((profile, index) => {
        if (profile.type === 'food') {
          const { image, name, nationality, category, doneDate, tags } = profile;
          return (
            <article className="doneRecipesCard">
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                { nationality }
                {' '}
                -
                {' '}
                { category }
              </p>
              <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              { getTagsElements(tags, index) }
              <button type="button">
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </article>
          );
        }
        if (profile.type === 'drink') {
          const { image, name, alcoholicOrNot, doneDate } = profile;
          return (
            <article className="doneRecipesCard">
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
              <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              <button type="button">
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
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
