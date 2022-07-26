import useDetails from './useDetails';
import useActualPath from './useActualPath';

function useInProgressInfo() {
  const localPath = useActualPath();
  return useDetails(localPath);
}

export default useInProgressInfo;
