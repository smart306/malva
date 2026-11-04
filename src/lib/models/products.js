import mongoose from "mongoose";

const ProductInfoSchema = new mongoose.Schema(
  {
    acoritem: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
);

const ImagesSchema = new mongoose.Schema(
  {
    image: {type: String, trim: true, required: true}
  }
)

const ProductColorSchema = new mongoose.Schema(
  {
    color: { type: String, required: true, trim: true },
    quantity: {type: Number, required: true, trim: true}
  },
);

const ProductReviewSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now }, 
    userId: { type: String }, 
    name: { type: String, required: true, trim: true },
    review: { type: String, required: true, trim: true },
    star: {type: Number, required: true}
  },
);

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0, index: true },
    brand: { type: String, required: true, trim: true, index: true },
    maincategory: { type: String, required: true, trim: true, index: true },
    rating: {type: Number, default: 0}, 
    subcategories: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      default: [],
    },

    images: { type: [ImagesSchema], default: []},

    info: { type: [ProductInfoSchema], default: [] },
    colors: { type: [ProductColorSchema], default: [] },
    reviews: { type: [ProductReviewSchema], default: [] },
    quantity: { type: Number, required: true}
  },
  { timestamps: true },
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;