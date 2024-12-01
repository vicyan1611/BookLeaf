import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import Books from "./pages/books";
import UserProfile from "./pages/userProfile";
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
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
