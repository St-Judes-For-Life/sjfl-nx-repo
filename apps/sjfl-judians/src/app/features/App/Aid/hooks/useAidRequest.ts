import { useContext } from 'react';
import { AidRequestContext } from '../store/AidRequestProvider';
import { useNavigate } from 'react-router-dom';
import { Stream } from '../models/aid-workflow-config.model';

export function useAidRequest() {
  const context = useContext(AidRequestContext);
  if (!context) {
    throw new Error('Aid Request Context is not available');
  }

  return context;
}

export function useSelectedStream(): Stream {
  const context = useContext(AidRequestContext);
  const navigate = useNavigate();
  if (!context) {
    throw new Error('Aid Request Context is not available');
  }

  if (!context.request) {
    navigate('/aid/editor/create');
    throw new Error('Aid Request not available');
  }

  if (!context.request.stream) {
    navigate('/aid/editor/create');
    throw new Error('Aid Request Stream is not available');
  }

  return context.request.stream;
}
