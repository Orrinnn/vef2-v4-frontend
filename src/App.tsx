import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CreateNewsPage } from './pages/CreateNewsPage';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'news/create',
        element: <CreateNewsPage />,
      },
      {
        path: 'news/:slug',
        element: <NewsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;