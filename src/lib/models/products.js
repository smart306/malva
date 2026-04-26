import mongoose from "mongoose";

const ProductInfoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    acoritem: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const ProductColorSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    color: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const ProductReviewSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    review: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      required: true,
      enum: ["decor", "women", "men", "tools"],
      index: true,
    },

    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    ratingFull: { type: Number, default: 0, min: 0, max: 5 },
    ratingHalf: { type: Number, default: 0, enum: [0, 1] },

    price: { type: Number, required: true, min: 0, index: true },
    brand: { type: String, required: true, trim: true, index: true },

    maincategory: { type: String, required: true, trim: true, index: true },

    subcategories: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      default: [],
    },

    images: {
      type: [
        {
          type: String,
          trim: true,
          required: true,
        },
      ],
      default: [],
    },

    info: { type: [ProductInfoSchema], default: [] },
    colors: { type: [ProductColorSchema], default: [] },
    reviews: { type: [ProductReviewSchema], default: [] },
  },
  { timestamps: true },
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;