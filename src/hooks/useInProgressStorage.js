import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ReceitasContext from './ReceitasContext';
import useActualPath from './useActualPath';

function useInProgressStorage(checkedItens, setCheckedItems, setFavorite) {
  const pathname = useActualPath();
  const match = useRouteMatch();
  const { params: { id } } = match;
  const { setFoodInProgress, setDrinkInProgress } = useContext(ReceitasContext);

  useEffect(() => {
    const INITIAL_PROGRESS = {
      cocktails: {},
      meals: {},
    };

    const inProgress = localStorage.getItem('inProgressRecipes');

    if (!inProgress) {
      // Aqui criamos o objeto do local storage vazio, caso ele ainda não exista
      const initialProgress = JSON.stringify(INITIAL_PROGRESS);
      return localStorage.setItem('inProgressRecipes', initialProgress);
    }
  }, []);

  useEffect(() => {
    const inProgress = localStorage.getItem('inProgressRecipes');

    // Aqui trabalharemos os elementos food

    if (inProgress) {
      const newSetInProgress = JSON.parse(inProgress);
      if (pathname.includes('food')) {
        const idInProgress = Object.keys(newSetInProgress.meals);
        if (idInProgress.some((item) => item === id)) {
          return setCheckedItems(newSetInProgress.meals[id]);
        }
        const foodInProgress = {
          cocktails: { ...newSetInProgress.cocktails },
          meals: { ...newSetInProgress.meals, [id]: [] },
        };
        setFoodInProgress(foodInProgress);
        const data = JSON.stringify(foodInProgress);
        return localStorage.setItem('inProgressRecipes', data);
      }
    }
  }, [pathname, id, setFoodInProgress, setCheckedItems]);

  useEffect(() => {
    const inProgress = localStorage.getItem('inProgressRecipes');

    // Aqui trabalharemos os elementos drink

    if (inProgress) {
      const newSetInProgress = JSON.parse(inProgress);
      if (pathname.includes('drink')) {
        const idInProgress = Object.keys(newSetInProgress.cocktails);
        if (idInProgress.some((item) => item === id)) {
          return setCheckedItems(newSetInProgress.cocktails[id]);
        }

        const drinkInProgress = {
          cocktails: { ...newSetInProgress.cocktails, [id]: [] },
          meals: { ...newSetInProgress.meals },
        };
        setDrinkInProgress(drinkInProgress);
        const data = JSON.stringify(drinkInProgress);
        return localStorage.setItem('inProgressRecipes', data);
      }
    }
  }, [pathname, id, setDrinkInProgress, setCheckedItems]);

  // O UseEffect abaixo realiza a atualização dos itens checked
  useEffect(() => {
    const inProgress = localStorage.getItem('inProgressRecipes');
    const newSetInProgress = JSON.parse(inProgress);
    if (pathname.includes('food')) {
      const foodInProgress = {
        cocktails: { ...newSetInProgress.cocktails },
        meals: { ...newSetInProgress.meals, [id]: [...checkedItens] },
      };
      setFoodInProgress(foodInProgress);
      const data = JSON.stringify(foodInProgress);
      return localStorage.setItem('inProgressRecipes', data);
    }
    if (pathname.includes('drink')) {
      const drinkInProgress = {
        cocktails: { ...newSetInProgress.cocktails, [id]: [...checkedItens] },
        meals: { ...newSetInProgress.meals },
      };
      setDrinkInProgress(drinkInProgress);
      const data = JSON.stringify(drinkInProgress);
      return localStorage.setItem('inProgressRecipes', data);
    }
  }, [checkedItens, id, pathname, setDrinkInProgress, setFoodInProgress]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (!favoriteRecipes) {
      const voidFavRecipes = JSON.stringify([]);
      setFavorite(false);
      return localStorage.setItem('favoriteRecipes', voidFavRecipes);
    }
    const favoriteData = JSON.parse(favoriteRecipes);
    if (favoriteData.some((item) => item.id === id)) {
      return setFavorite(true);
    }
    return setFavorite(false);
  }, [id, setFavorite]);
}

export default useInProgressStorage;
