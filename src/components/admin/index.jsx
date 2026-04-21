import AddProductDecorButton from "./addproductdecor";
import AddProductManButton from "./addproductman";
import AddProductToolsButton from "./addproductools";
import AddProductWomanButton from "./addproductwom";

export default function Admin(){
    return (
      <div className="pt-12 lg:pt-28">
        <AddProductWomanButton />
        <AddProductDecorButton />
        <AddProductManButton />
        <AddProductToolsButton />
      </div>
    );
}