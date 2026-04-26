import Category from "@/components/category";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function CategoryPageMain() {
  await connectDB();

  const [productsRaw, priceBounds, brands, colors] = await Promise.all([
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

  const normalizedBrands = brands
    .map((brand) => String(brand).trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const normalizedColors = colors
    .map((color) => String(color).trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const products = productsRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div className="mt-18">
      <Category
        data={products}
        minBound={minBound}
        maxBound={maxBound}
        brands={normalizedBrands}
        colors={normalizedColors}
      />
    </div>
  );
}
