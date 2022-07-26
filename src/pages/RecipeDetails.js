import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReceitasContext from '../hooks/ReceitasContext';
import useActualPath from '../hooks/useActualPath';
import useDetails from '../hooks/useDetails';

function RecipeDetails({ match: { params: { id } } }) {
  const [buttonText, setButtonText] = useState('Start Recipe');
  const [changeBtn, setChangeBtn] = useState(false);
  const actualpath = useActualPath();
  // const history = useHistory();

  useDetails(actualpath);

  const {
    recipesData: { recipeInDetail },
    recipesData,
  } = useContext(ReceitasContext);

  const objLength = Object.keys(recipeInDetail).length;

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const mealsRecipes = inProgressRecipes?.meals;
      const cocktailsRecipes = inProgressRecipes?.cocktails;
      // const result = arrayOfProgressRecipes?.some(
      //   (item) => item.recipeId === id,
      // ) ? 'Continue Recipe' : 'Start Recipe';
      if (mealsRecipes[id] || cocktailsRecipes[id]) {
        return setButtonText('Continue Recipe');
      }
    }
    return setButtonText('Continue Recipe');
  }, [id, changeBtn]);

  const generateIngredients = () => {
    const arrayOfIngredients = Object.keys(recipeInDetail)
      .filter((str) => str.includes('strIngredient'))
      .map((item) => recipeInDetail[item])
      .filter((recipe) => recipe !== null);
    const arrayOfMeasures = Object.keys(recipeInDetail)
      .filter((str) => str.includes('strMeasure'))
      .map((item) => recipeInDetail[item])
      .filter((recipe) => recipe !== null);
    return (
      arrayOfIngredients.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
          {' '}
          {arrayOfMeasures[index]}

        </p>
      ))
    );
  };

  const itemTitle = actualpath.includes('food')
    ? recipeInDetail.strMeal : recipeInDetail.strDrink;

  const imgUrl = actualpath.includes('food')
    ? recipeInDetail.strMealThumb : recipeInDetail.strDrinkThumb;

  const category = recipeInDetail.strCategory;

  const videoUrl = actualpath.includes('food')
    ? recipeInDetail.strYoutube : '';

  const alcohol = actualpath.includes('drink') ? recipeInDetail.strAlcoholic : null;

  const recomendations = actualpath.includes('food')
    ? recipesData.drinksData : recipesData.foodData;

  const maxSliderNum = 6;

  const generateRecomendations = () => {
    const recomendedItems = recomendations
      .filter((_, recIndex) => recIndex < maxSliderNum)
      .map((item, index) => {
        if (item.strDrink) {
          return (
            <div
              key={ item.idDrink }
              className="recomendCard"
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ item.strDrinkThumb }
                alt="thumbnail"
                className="sliderImg"

              />
              <p
                data-testid={ `${index}-recomendation-title` }
              >
                {item.strDrink}

              </p>
            </div>
          );
        }
        return (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-card` }
            className="recomendCard"
          >
            {console.log('entrou no return')}
            <img src={ item.strMealThumb } alt="thumbnail" />
            <p
              key={ item.idMeal }
              data-testid={ `${index}-recomendation-title` }
            >
              {item.strMeal}

            </p>
          </div>
        );
      });
    return recomendedItems;
  };

  const checkDoneItem = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const arrayOfDoneRecipes = JSON.parse(doneRecipes);
      return arrayOfDoneRecipes.find((item) => item.id === id);
    }
  };

  return (
    <main>
      <div id="detailContainer">
        {
          (objLength)
            ? <h1 data-testid="recipe-title">{itemTitle}</h1>
            : <h1>loading...</h1>
        }
        <img
          src={ imgUrl }
          alt="thumbnail"
          data-testid="recipe-photo"
          className="containerImg"
        />
        <p data-testid="recipe-category">
          Category:
          {' '}
          {category}
          {' '}
          {' '}
          {alcohol}
        </p>
        <p>Ingredients:</p>
        {generateIngredients()}
        <p data-testid="instructions">{recipeInDetail.strInstructions}</p>
        <div className="embedContainer">
          <iframe
            data-testid="video"
            width="853"
            height="480"
            src={ videoUrl?.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
            title="Embedded youtube"

          />
        </div>
        <div className="recomendations">
          {generateRecomendations()}
        </div>
      </div>
      {
        checkDoneItem() ? null : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            id="startBtn"
            // onClick={ () => history.push(`${id}/in-progress`) }
            onClick={ () => {
              const recipeKey = actualpath.includes('food') ? 'meals' : 'cocktails';
              const storingItem = {
                [recipeKey]: {
                  [id]: [],
                },
              };
              const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
              if (getStorage) {
                localStorage.setItem('inProgressRecipes', JSON.stringify(
                  { ...getStorage,
                    [recipeKey]: {
                      ...getStorage[recipeKey], [id]: [],
                    },
                  },
                ));
              } else {
                localStorage.setItem('inProgressRecipes', JSON.stringify(storingItem));
              }
              setChangeBtn(!changeBtn);
            } }
          >
            { buttonText }

          </button>
        )
      }

    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.string.isRequired,
};
export default RecipeDetails;
