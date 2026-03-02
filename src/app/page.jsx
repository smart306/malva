import Brands from "@/components/brands/brands";
import ButtonCategoryMain from "@/components/main/buttonscat";
import Header from "@/components/main/hero";
import NewProduct from "@/components/main/newest";
import PopularProduct from "@/components/main/popularp";
import Subscribe from "@/components/main/subscribe";

export default function Home() {
  return (
    <div>
      <Header />
      <Brands />
      <div>
        <ButtonCategoryMain/>
        <NewProduct/>
        <PopularProduct/>
        <Subscribe/>
      </div>
      <Brands />
    </div>
  );
}
