import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

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

  // function renderTagsList(tags) {
  //   return tags.map((tag) => {
  //     return
  //   })
  // }

  function renderDoneCards() {
    if (doneRecipes !== undefined) {
      return doneRecipes.map((profile, index) => {
        if (profile.type === 'food') {
          const { image, name, category, date, tags } = profile;
          return (
            <article>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
              <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              <p data-testid={ `${index}-horizontal-done-date` }>{ date }</p>
              <p data-testid={ `${index}-${tags}-horizontal-tag` }>{ tags }</p>
            </article>
          );
        }
        if (profile.type === 'drink') {
          const { image, name, alcoholic, date } = profile;
          return (
            <article>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholic }</p>
              <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              <p data-testid={ `${index}-horizontal-done-date` }>{ date }</p>
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
