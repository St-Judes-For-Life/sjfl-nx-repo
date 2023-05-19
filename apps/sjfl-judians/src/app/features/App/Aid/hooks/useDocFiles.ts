import { useNavigate } from 'react-router-dom';
import { useAidRequest } from './useAidRequest';

export function useDocFiles(docId: string) {
  const navigate = useNavigate();
  const { request } = useAidRequest();
  if (!request) {
    navigate('/aid/editor/create');
    throw new Error('Aid Request not available');
  }
  const { docs = [] } = request!;
  const doc = docs.find((doc) => doc.docId === docId);
  const files = doc?.files || [];

  return files;
}
