import React from "react";
import { Button } from "../ui/button";

type Props = {
  hasSizesOrExtra: boolean;
  basePrice: number;
  item: MenuItemType;
  handleAddToCartButtonClick: (item: MenuItemType) => void;
  sizes: AddonType[];
};

const AddToCartButton = ({
  hasSizesOrExtra,
  basePrice,
  item,
  handleAddToCartButtonClick,
  sizes,
}: Props) => {
  // if (!hasSizesOrExtra) {
  //   return (
  //     <div className="">
  //       <Button
  //         onClick={() => handleAddToCartButtonClick(item)}
  //         className="mt-4 rounded-full px-8"
  //       >
  //         <span>Add to cart ${basePrice}</span>
  //       </Button>
  //     </div>
  //   );
  // }

  return hasSizesOrExtra ? (
    <div className="">
      <Button
        type="button"
        onClick={() => handleAddToCartButtonClick(item)}
        className="mt-4 bg-primary text-white border border-primary rounded-full px-8 py-2 hover:bg-inherit hover:text-primary"
      >
        {hasSizesOrExtra ? (
          <span>
            Add to cart (from $
            {Math.floor(basePrice) + Math.floor(Number(sizes?.[0]?.price))})
          </span>
        ) : (
          <span>Add to cart ${basePrice}</span>
        )}
      </Button>
    </div>
  ) : (
    <div className="group">
      <Button
        onClick={() => handleAddToCartButtonClick(item)}
        className="mt-4 rounded-full px-8 border border-primary hover:bg-inherit hover:text-primary"
      >
        <span>Add to cart ${basePrice}</span>
      </Button>
    </div>
  );
};

export default AddToCartButton;
