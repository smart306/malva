import Brands from "../brands/brands";
import CategoryButton from "./buttonscat";
import ContentCategory from "./content";

export default function Category({ data, minBound, maxBound, brands, colors }) {
  return (
    <div>
      <CategoryButton />
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
