import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="app h-[100dvh] grid grid-rows-[auto,1fr]">
      <Header />
      <main className="px-8 pb-2 h-full">
        <Outlet />
      </main>
    </div>
  );
};
