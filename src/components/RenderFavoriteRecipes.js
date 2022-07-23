import React, { useContext } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function RenderFavoriteRecipes() {
  const { recipesData: { favoriteRecipes } } = useContext(ReceitasContext);
  if (favoriteRecipes !== undefined) {
    return favoriteRecipes.map((recipe, index) => {
      const { type, image, name, category, nationality, alcoholicOrNot } = recipe;
      console.log(type);
      if (type === 'food') {
        return (
          <article className="doneRecipesCard" key={ `${name}_${index}` }>
            <img src={ image } alt={ `${name}_${index}` } />
            <h2>{name}</h2>
            <p>{category}</p>
            <p>{nationality}</p>
            <button type="button">Compartilhar</button>
            <button type="button">Favoritar</button>
          </article>
        );
      }
      if (type === 'drink') {
        return (
          <article className="doneRecipesCard" key={ `${name}_${index}` }>
            <img src={ image } alt={ `${name}_${index}` } />
            <h2>{name}</h2>
            <p>{category}</p>
            <p>{alcoholicOrNot}</p>
            <button type="button">Compartilhar</button>
            <button type="button">Favoritar</button>
          </article>
        );
      }
      return <h3 key={ `warning_${index}` }>Como você veio parar aqui?</h3>;
    });
  }
  return <h3>loading...</h3>;
}

export default RenderFavoriteRecipes;
