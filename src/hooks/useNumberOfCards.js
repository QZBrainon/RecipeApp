import { useContext } from 'react';
import ReceitasContext from './ReceitasContext';

function useNumberOfCards() {
  const { isFilterResult } = useContext(ReceitasContext);
  const five = 5;
  const twelve = 12;
  return (isFilterResult) ? five : twelve;
}

export default useNumberOfCards;
