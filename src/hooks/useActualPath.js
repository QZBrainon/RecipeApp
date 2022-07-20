import { useHistory } from 'react-router-dom';

function useActualPath() {
  const history = useHistory();
  const { pathname } = history.location;
  return pathname;
}

export default useActualPath;
