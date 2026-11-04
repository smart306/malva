import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    maincategory: { type: String, required: true, trim: true },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    subcategories: [
      {
        type: String,
        trim: true
      },
    ], 
    slug: { type: String, trim: true },
  },
  { timestamps: true },
);

const Categories = mongoose.models.Categories || mongoose.model("Categories", CategorySchema);
export default Categories;
