import { Outlet } from 'react-router';
import { Footer } from '../../../widgets/footer';
import { Header } from '../../..//widgets/header';

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
