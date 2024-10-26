import React from "react";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import { TLoading } from "@types";
import LottieHandler from "../LottieHandler/LottieHandler";

// Dynamic component pattern
// (choose rendered component based on dynamic key)
const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
}; // keys names = (type) values

type LoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
};
// ((( keyof type query ))) => TS property
// Here I made (type) gets values [dynamically] based on [skeletonsTypes key]

// [[[ typeof skeletonsTypes ]]]:-
// -------------------------------
// const skeletonsTypes = {
//   category: "CategorySkeleton",
//   product: "ProductSkeleton",
//   cart: "CartSkeleton",
// };

// keyof => Take (keys) and put them in an array
// [category, product, cart]

const Loading = ({
  loading,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonsTypes[type];
  // points at a component in skeletonsTypes object

  if (loading === "pending") {
    return <Component />;
  }
  if (loading === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Loading;
