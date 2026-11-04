import Brands from "../brands/brands";
import CategoryButton from "./buttonscat";
import ContentCategory from "./content";

export default async function Category({ categories, data, minBound, maxBound, brands, colors }) {
  return (
    <div>
      <CategoryButton data={categories}/>
      <Brands />
      <ContentCategory
        data={data}
        minBound={minBound}
        maxBound={maxBound}
        brands={brands}
        colors={colors}
      />
      <Brands />
    </div>
  );
}
