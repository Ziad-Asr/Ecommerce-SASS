import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const AuthLayout = lazy(() => import("@layouts/AuthLayout/AuthLayout"));
// components
import { LottieHandler, PageSuspenseFallback } from "@components/feedback";
// pages
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist/Wishlist"));
const Categories = lazy(() => import("@pages/Categories/Categories"));
const Cart = lazy(() => import("@pages/Cart/Cart"));
const Products = lazy(() => import("@pages/Products/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login/Login"));
const Register = lazy(() => import("@pages/Register/Register"));
const Profile = lazy(() => import("@pages/Profile"));
import Error from "@pages/Error/Error";
// Protect route
import ProtectedRoute from "../components/Auth/ProtectedRoute";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div style={{ marginTop: "10%" }}>
              <LottieHandler type="loading" message="Loading please wait..." />
            </div>
          }
        >
          <MainLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <Home />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "categories",
          element: (
            <PageSuspenseFallback>
              <Categories />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "categories/products/:prefix",
          element: (
            <PageSuspenseFallback>
              <Products />
            </PageSuspenseFallback>
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
            <PageSuspenseFallback>
              <AboutUs />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "cart",
          element: (
            <PageSuspenseFallback>
              <Cart />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <PageSuspenseFallback>
                <Wishlist />
              </PageSuspenseFallback>
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <PageSuspenseFallback>
                <Profile />
              </PageSuspenseFallback>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: (
        <Suspense
          fallback={
            <div style={{ marginTop: "10%" }}>
              <LottieHandler type="loading" message="Loading please wait..." />
            </div>
          }
        >
          <AuthLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "login",
          element: (
            <PageSuspenseFallback>
              <Login />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "register",
          element: (
            <PageSuspenseFallback>
              <Register />
            </PageSuspenseFallback>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
