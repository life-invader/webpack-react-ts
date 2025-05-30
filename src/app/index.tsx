import { logAnything } from '../shared/lib/utils.js';
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Root } from '@entities/root/index';
import MainPage from '@pages/main/main.page';
import { AboutPageLazy as AboutPage } from '@pages/about/about.lazy';
import './style/index.scss';

logAnything();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback="Грузим">
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: <h2>Shop</h2>,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
