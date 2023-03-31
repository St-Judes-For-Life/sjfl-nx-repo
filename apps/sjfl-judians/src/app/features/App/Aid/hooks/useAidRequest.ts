import { useContext } from 'react';
import { AidRequestContext } from '../store/AidRequestProvider';

export function useAidRequest() {
  const context = useContext(AidRequestContext);
  if (!context) {
    throw new Error('Aid Request Context is not available');
  }

  return context;
}
