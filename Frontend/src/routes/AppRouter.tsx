import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import { AuthLayout, MainLayout } from "@layouts/index";

// Pages
import Home from "@pages/Home";
import Products from "@pages/Products";
import Categories from "@pages/Categories";
import AboutUs from "@pages/AboutUs";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Error from "@pages/Error/Error";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "products/:prefix",
          element: <Products />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
