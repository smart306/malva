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

const ProductDecorSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ratingFull: { type: Number, default: 0, min: 0, max: 5 },
    ratingHalf: { type: Number, default: 0, enum: [0, 1] },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true, trim: true },
    maincategory: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
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

const ProductWomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ratingFull: { type: Number, default: 0, min: 0, max: 5 },
    ratingHalf: { type: Number, default: 0, enum: [0, 1] },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true, trim: true },
    maincategory: { type: String, required: true, trim: true },
    subcategory1: { type: String, required: true, trim: true },
    subcategory2: { type: String, required: true, trim: true },
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
    reviews: { type: [ProductReviewSchema], default: [] },
  },
  { timestamps: true },
);

const ProductManSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ratingFull: { type: Number, default: 0, min: 0, max: 5 },
    ratingHalf: { type: Number, default: 0, enum: [0, 1] },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true, trim: true },
    maincategory: { type: String, required: true, trim: true },
    subcategory1: { type: String, required: true, trim: true },
    subcategory2: { type: String, required: true, trim: true },
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
    reviews: { type: [ProductReviewSchema], default: [] },
  },
  { timestamps: true },
);

const ProductToolsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ratingFull: { type: Number, default: 0, min: 0, max: 5 },
    ratingHalf: { type: Number, default: 0, enum: [0, 1] },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true, trim: true },
    maincategory: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
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
    reviews: { type: [ProductReviewSchema], default: [] },
  },
  { timestamps: true },
);

const ProductDecor =
  mongoose.models.ProductDecor || mongoose.model("ProductDecor", ProductDecorSchema);
const ProductWom =
  mongoose.models.ProductWom || mongoose.model("ProductWom", ProductWomSchema);
const ProductMan =
  mongoose.models.ProductMan || mongoose.model("ProductMan", ProductManSchema);
const ProductTools =
  mongoose.models.ProductTools || mongoose.model("ProductTools", ProductToolsSchema);
  
export default { ProductDecor,
ProductWom, 
ProductMan, 
ProductTools}