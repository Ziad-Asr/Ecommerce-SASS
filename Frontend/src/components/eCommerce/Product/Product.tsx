import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/CartSlice";
import { Button, Spinner } from "react-bootstrap";
import { TProduct } from "@types";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

import styles from "./styles.module.css";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);
    // Nullish coalescing
    // ((( quantity ?? 0 ))) ===>>> take quantity value, but if it is (null | undefined) make it equals (zero)

    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (!isLoading) {
        setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false)) // for success response
          .catch(() => setIsLoading(false)); // for network errors
      }
    };

    return (
      <div className={product}>
        <div className={wishlistBtn} onClick={likeToggleHandler}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2 title={title}>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        <p className={maximumNotice}>
          {quantityReachedToMax
            ? "You reach to the limit"
            : `You can add ${currentRemainingQuantity} item(s)`}
        </p>
        <Button
          variant="info"
          style={{ color: "white" }}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            "Add to cart"
          )}
        </Button>
      </div>
    );
  }
);

export default Product;
