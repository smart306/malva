import Background from "../background";
import Brands from "../brands/brands";
import CategoryButton from "./buttonscat";
import ContentCategory from "./content";

export default function Category(){
    return (
      <div>
        <CategoryButton />
        <Brands />
        <ContentCategory />
        <Brands />
      </div>
    );
}