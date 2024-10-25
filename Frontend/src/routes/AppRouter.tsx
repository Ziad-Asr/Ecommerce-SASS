import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const AuthLayout = lazy(() => import("@layouts/AuthLayout/AuthLayout"));
// pages
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist/Wishlist"));
const Categories = lazy(() => import("@pages/Categories/Categories"));
const Cart = lazy(() => import("@pages/Cart/Cart"));
const Products = lazy(() => import("@pages/Products/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
import Error from "@pages/Error/Error";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback="loading please wait..">
          <MainLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback="loading please wait..">
              <Home />
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback="loading please wait..">
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "categories/products/:prefix",
          element: (
            <Suspense fallback="loading please wait..">
              <Products />
            </Suspense>
          ),
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
          element: (
            <Suspense fallback="loading please wait..">
              <AboutUs />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback="loading please wait..">
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback="loading please wait..">
              <Wishlist />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: (
        <Suspense fallback="loading please wait..">
          <AuthLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "login",
          element: (
            <Suspense fallback="loading please wait..">
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback="loading please wait..">
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
