import { Schema, model, models, Types } from "mongoose";

const orderSchema = new Schema(
  {
    userEmail: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    postcode: {
      type: String,
    },
    country: {
      type: String,
    },
    cartProducts: Object,
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = models?.Order || model("Order", orderSchema);

export default Order;
