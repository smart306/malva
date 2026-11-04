import Category from "@/components/category";
import Categories from "@/lib/models/categories";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function CategoryPageMain() {
  await connectDB();

  const [categoriesRaw, productsRaw, priceBounds, brandsRaw, colorsRaw] = await Promise.all([
    Categories.find({}).lean(),

    ProductModel.find({}).sort({ createdAt: -1 }).lean(),

    ProductModel.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: "$price" },
          max: { $max: "$price" },
        },
      },
    ]),

    ProductModel.distinct("brand", {
      brand: { $exists: true, $nin: [null, ""] },
    }),

    ProductModel.distinct("colors.color", {
      "colors.color": { $exists: true, $nin: [null, ""] },
    }),
  ]);

  const minBound = Math.floor(priceBounds[0]?.min ?? 0);
  const maxBound = Math.ceil(priceBounds[0]?.max ?? 10000);

  const safeBrands = JSON.parse(JSON.stringify(brandsRaw));
  const safeColors = JSON.parse(JSON.stringify(colorsRaw));

  const normalizedBrands = safeBrands
    .map((brand) => String(brand).trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const normalizedColors = safeColors
    .map((color) => String(color).trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const categories = JSON.parse(JSON.stringify(categoriesRaw));
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <div className="mt-18">
      <Category
        categories={categories}
        data={products}
        minBound={minBound}
        maxBound={maxBound}
        brands={normalizedBrands}
        colors={normalizedColors}
      />
    </div>
  );
}
