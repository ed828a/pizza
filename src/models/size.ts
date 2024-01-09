import { Schema, model, models } from "mongoose";

const sizeSchema = new Schema(
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

const Size = models.Size || model("Size", sizeSchema);

export default Size;
