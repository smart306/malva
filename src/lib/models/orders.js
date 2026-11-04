import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
          trim: true,
          default: "",
        }
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dostavka: {
      type: String,
    },
    pointsRecieved: {
      type: Number,
      default: 0,
    },
    pointsApplied: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;