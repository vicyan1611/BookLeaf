import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import Books from "./pages/books";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HelloWorld />,
  },
  {
    path: "/hello",
    element: <HelloWorld />,
  },
  {
    path: "/books",
    element: <Books />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
