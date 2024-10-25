import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import { AuthLayout, MainLayout } from "@layouts/index";

// Pages
import Home from "@pages/Home";
import Products from "@pages/Products/Products";
import Categories from "@pages/Categories/Categories";
import AboutUs from "@pages/AboutUs";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Error from "@pages/Error/Error";
import Cart from "@pages/Cart/Cart";
import Wishlist from "@pages/Wishlist/Wishlist";

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
          path: "categories/products/:prefix",
          element: <Products />,
          loader: ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad Request", {
                statusText: "Category not found",
                status: 400,
              });
            }
            return true;
          },
          // Condition to confirm that the category prefix is a pure string, because there is not category with name of any other characters
          // So here we reduce backend calls to make the app more efficient
          // throw new Response() => This is how we return errors in react-router-dom (to navigate to dynamic error page)
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <Wishlist /> },
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
