import React from "react";

import styles from "./styles.module.css";

type ProductInfoProps = {
  title: string;
  img: string;
  price: number;
  children?: React.ReactNode;
  direction?: "row" | "column";
  style?: React.CSSProperties;
};
// props ==>> similar between all used cases
// children ==>> Not similar between all used cases

const ProductInfo = ({
  title,
  img,
  price,
  children,
  direction = "row",
  style,
}: ProductInfoProps) => {
  console.log(`${styles["product"]}-${direction}`);

  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt="title" />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price} EGP</h3>
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
