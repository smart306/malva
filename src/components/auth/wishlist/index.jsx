import CardProduct from "@/components/category/cardpro";

export default function Wishlist({wishlist}){
  if (!wishlist) return (
      <div className="h-screen text-center mt-35">
        <p>Ви ще немаєте вподобаих продуктів</p>
      </div>
    );
      return (
        <div className="w-full py-4">
          <div className="my-container">

        <div className="flex flex-col lg:flex-row w-full">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
          {wishlist.map((product) => (
            <CardProduct key={product._id} data={product} />
          ))}
          </div>
        </div>
        </div>
        </div>
      );
    }