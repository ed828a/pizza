import { Schema, model, models, Types } from "mongoose";

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    basePrice: {
      type: String,
      required: true,
    },
    sizes: {
      type: [
        {
          name: String,
          price: Number,
        },
      ],
    },
    extraIngredients: {
      type: [
        {
          name: String,
          price: Number,
        },
      ],
    },
    bestSeller: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const MenuItem = models?.MenuItem || model("MenuItem", menuItemSchema);

export default MenuItem;
