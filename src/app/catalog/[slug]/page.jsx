import Category from "@/components/category";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";
import Categories from "@/lib/models/categories";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  await connectDB();

  const query = {
    maincategory: slug,
  };
  const [categoriesRaw] = await Promise.all([
    Categories.find({}).lean(),
  ]);

  const [productsRaw, priceBounds, brands, colors] = await Promise.all([
    ProductModel.find({ query })
      .sort({ createdAt: -1 })
      .lean(),
    ProductModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          min: { $min: "$price" },
          max: { $max: "$price" },
        },
      },
    ]),
    ProductModel.distinct("brand", {
      ...query,
      brand: { $exists: true, $nin: [null, ""] },
    }),
    ProductModel.distinct("colors.color", {
      ...query,
      "colors.color": { $exists: true, $nin: [null, ""] },
    }),
  ]);

  const minBound = Math.floor(priceBounds[0]?.min ?? 0);
  const maxBound = Math.ceil(priceBounds[0]?.max ?? 10000);

  const normalizedBrands = brands
    .map((brand) => String(brand).trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const normalizedColors = colors
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
