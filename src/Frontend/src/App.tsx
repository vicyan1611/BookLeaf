import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import Books from "./pages/books";
import Reader from "./pages/reading";
import UserProfile from "./pages/userProfile";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
		path: "/books/:id",
		element: <Reader />,
	},
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
]);

function App() {
	return (<>
    <ToastContainer 
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={true}
    closeButton={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    />
    <RouterProvider router={router} />
  </>);
}

export default App;
