import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HelloWorld from './pages/HelloWorld';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HelloWorld />,
  },
  {
    path: "/hello",
    element: <HelloWorld />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;