import mongoose from "mongoose";

const MAIN_CATEGORIES = [
  "Декоративна косметика",
  "Жіноча доглядова косметика",
  "Чоловіча доглядова косметика",
  "Інструменти для догляду",
];

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    maincategory: {
      type: String,
      required: true,
      enum: MAIN_CATEGORIES,
      trim: true,
    },
    subcategory: { type: String, trim: true },
    subcategory1: { type: String, trim: true },
    subcategory2: { type: String, trim: true },
  },
  { timestamps: true },
);

CategorySchema.pre("validate", function validateCategory(next) {
  const isSingleSubcategory =
    this.maincategory === "Декоративна косметика" ||
    this.maincategory === "Інструменти для догляду";

  if (isSingleSubcategory) {
    if (!this.subcategory) {
      return next(new Error("Для цієї категорії поле subcategory обов'язкове"));
    }
    this.subcategory1 = undefined;
    this.subcategory2 = undefined;
    return next();
  }

  if (!this.subcategory1 || !this.subcategory2) {
    return next(
      new Error("Для цієї категорії обов'язкові subcategory1 і subcategory2"),
    );
  }

  this.subcategory = undefined;
  return next();
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export { MAIN_CATEGORIES };
export default Category;
