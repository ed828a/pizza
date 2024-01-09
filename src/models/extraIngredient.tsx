import { Schema, model, models } from "mongoose";

const extraIngredientSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ExtraIngredient =
  models.ExtraIngredient || model("ExtraIngredient", extraIngredientSchema);

export default ExtraIngredient;
