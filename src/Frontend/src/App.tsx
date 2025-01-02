import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import Books from "./pages/books";
import Reader from "./pages/reading";
import LoginPageNormalUser from "./pages/login";
import LoginPageAdmin from "./pages/adminLogin";
import UserProfile from "./pages/userProfile";
import Register from "./pages/register";
import ResetPass from "./pages/forgotPass";
import Following from "./pages/following";
import AdminDeleteUser from "./pages/adminDeleteUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
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
    path: "/login",
    element: <LoginPageNormalUser />,
  },
  {
    path: "/admin",
    element: <LoginPageAdmin />,
  },
  {
    path: "/user-profile/:id",
    element: <UserProfile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
  {
    path: "/following",
    element: <Following />,
  },
  {
    path: "/admin/delete-user",
    element: <AdminDeleteUser />,
  },
]);

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
