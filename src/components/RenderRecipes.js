import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../hooks/ReceitasContext';
import useNumberOfCards from '../hooks/useNumberOfCards';
import useFilter from '../hooks/useFilter';
import useCards from '../hooks/useCards';
import useOriginalData from '../hooks/useOriginalData';

function RenderRecipes() {
  const history = useHistory();
  const actualPath = history.location.pathname;
  const { recipesData,
    categoriesFoods, categoriesDrinks,
    setFilterResult, isFilterResult,
    setFoodsList, setDrinksList } = useContext(ReceitasContext);
  const numberOfCards = useNumberOfCards();
  const { runFilter } = useFilter();
  const originalData = useOriginalData();
  const { renderCards } = useCards();

  const [activeFilter, setActiveFilter] = useState('');

  const removeAllFilter = () => {
    setFilterResult(false);
    setActiveFilter('');
    const { originalDrinkList, originalFoodList } = originalData;
    setDrinksList(originalDrinkList);
    setFoodsList(originalFoodList);
  };

  const handleChange = ({ target: { value } }) => {
    if (activeFilter === value) {
      return removeAllFilter();
    }
    setFilterResult(true);
    setActiveFilter(value);
    return runFilter(value, actualPath);
  };

  const getRecipesCards = (recipesKind) => {
    if (recipesKind === 'food') {
      const recipes = [...recipesData.foodData].slice(0, numberOfCards);
      const thumb = 'strMealThumb';
      const recipeName = 'strMeal';
      if (recipes.length === 1 && !isFilterResult) {
        const { idMeal: id } = recipes[0];
        return history.push(`/foods/${id}`);
      }
      return renderCards(recipes, recipeName, thumb);
    }

    if (recipesKind === 'drinks') {
      const recipes = [...recipesData.drinksData].slice(0, numberOfCards);
      const thumb = 'strDrinkThumb';
      const recipeName = 'strDrink';
      if (recipes.length === 1) {
        const { idDrink: id } = recipes[0];
        return history.push(`/drinks/${id}`);
      }
      return renderCards(recipes, recipeName, thumb);
    }
  };

  const categoriesBtn = (array) => array.map((category, index) => (
    <button
      type="button"
      key={ `${category.strCategory}_${index}` }
      data-testid={ `${category.strCategory}-category-filter` }
      value={ category.strCategory }
      onClick={ handleChange }
    >
      {category.strCategory}
    </button>
  ));

  return (
    <div className="cardGrid">
      {
        actualPath === '/foods'
          ? categoriesBtn(categoriesFoods)
          : categoriesBtn(categoriesDrinks)
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ removeAllFilter }
      >
        All
      </button>
      {
        (actualPath === '/foods')
          ? getRecipesCards('food')
          : getRecipesCards('drinks')
      }
    </div>
  );
}

export default RenderRecipes;
