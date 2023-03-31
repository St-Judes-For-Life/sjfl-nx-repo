import { Outlet } from 'react-router-dom';
import { AidRequestProvider } from '../store/AidRequestProvider';

export const AidRequestEditorLayout = () => {
  return (
    <AidRequestProvider>
      <Outlet></Outlet>
    </AidRequestProvider>
  );
};
