import Category from "@/components/category";
import { notFound } from "next/navigation";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  await connectDB();

  const categoryMap = {
    decorative: {
      productType: "decor",
      dbName: "Декоративна косметика",
    },
    men: {
      productType: "men",
      dbName: "Чоловіча доглядова косметика",
    },
    women: {
      productType: "women",
      dbName: "Жіноча доглядова косметика",
    },
    tools: {
      productType: "tools",
      dbName: "Інструменти для догляду",
    },
  };
  const currentCategory = categoryMap[slug];

  if (!currentCategory) {
    notFound();
  }

  const query = {
    productType: currentCategory.productType,
  };

  const [productRaw, priceBounds, brands, colors] = await Promise.all([
    ProductModel.find(query).sort({ createdAt: -1 }).lean(),
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

  const product = productRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div className="mt-18">
      <Category
        data={product}
        minBound={minBound}
        maxBound={maxBound}
        brands={normalizedBrands}
        colors={normalizedColors}
      />
    </div>
  );
}
