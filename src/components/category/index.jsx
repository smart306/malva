import Brands from "../brands/brands";
import CategoryButton from "./buttonscat";
import ContentCategory from "./content";

export default function Category({data}){
    return (
      <div>
        <CategoryButton />
        <Brands />
        <ContentCategory datacontent={data}/>
        <Brands />
      </div>
    );
}