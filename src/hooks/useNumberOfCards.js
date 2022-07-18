import { useContext } from 'react';
import ReceitasContext from './ReceitasContext';

function useNumberOfCards() {
  const { isSearchResult } = useContext(ReceitasContext);
  const five = 5;
  const twelve = 12;
  return (isSearchResult) ? five : twelve;
}

export default useNumberOfCards;
