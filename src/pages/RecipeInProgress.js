import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useActualPath from '../hooks/useActualPath';
import useDetails from '../hooks/useDetails';
import useProgressInfo from '../hooks/useProgressInfo';

const INITIAL_PROGRESS_DATA = {
  recipeId: '',
  checkedItens: '',
};

function RecipeInProgress() {
  const [inProgressData, setInProgressData] = useState(INITIAL_PROGRESS_DATA);
  const [checkedItens, setCheckedItems] = useState([]);
  const [isFavorite, setFavorite] = useState();

  const actualPath = useActualPath();
  useDetails(actualPath);

  const match = useRouteMatch();
  const { params: { id } } = match;

  const inProgressState = {
    checkedItens,
    isFavorite,
    setCheckedItems,
    setFavorite,
  };

  const { getProgressInfo } = useProgressInfo(inProgressState);

  useEffect(() => {
    setInProgressData({
      recipeId: id,
      checkedItens,
      isFavorite,
    });
  }, [checkedItens, id, isFavorite]);
console.log('fora useEffect');
  useEffect(() => {
    console.log('useEffect');
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (!favoriteRecipes) {
      const voidFavRecipes = JSON.stringify([]);
      setFavorite(false);
      return localStorage.setItem('favoriteRecipes', voidFavRecipes);
    }
    const favoriteData = JSON.parse(favoriteRecipes);
    console.log('fora do if');
    if (favoriteData.some((item) => item.id === id)) {
      console.log('dentro do if');
      return setFavorite(true);
    }
    return setFavorite(false);
  }, [id]);

  useEffect(() => {
    const inProgress = localStorage.getItem('inProgressRecipes');
    if (inProgress === null) {
      const initialProgress = JSON.stringify([]);
      return localStorage.setItem('inProgressRecipes', initialProgress);
    }
    const loadCheckedItens = JSON.parse(inProgress);
    if (loadCheckedItens.find((item) => item.recipeId === id)) {
      const index = loadCheckedItens.findIndex((item) => item.recipeId === id);
      const itensChecked = loadCheckedItens[index].checkedItens;
      return setCheckedItems(itensChecked);
    }
  }, [id]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageData.find((data) => data.recipeId === id)) {
      const removeData = storageData.filter((data) => data.recipeId !== id);
      const localData = { ...inProgressData };
      const refreshStorageData = [...removeData, localData];
      const stringData = JSON.stringify(refreshStorageData);
      return localStorage.setItem('inProgressRecipes', stringData);
    }
    const localData = { ...inProgressData };
    const refreshStorageData = [...storageData, localData];
    const stringData = JSON.stringify(refreshStorageData);
    return localStorage.setItem('inProgressRecipes', stringData);
  }, [id, inProgressData]);

  return (
    <main>
      { getProgressInfo() }
    </main>
  );
}

export default RecipeInProgress;
