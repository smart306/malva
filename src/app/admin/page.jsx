import Admin from "@/components/admin";
import { connectDB } from "@/lib/mongoose";

  export default async function AdminPage() {
    await connectDB()
   
   
    return (
      <div className="mt-16">
        <div className="my-container">
          <Admin/>
        </div>
      </div>
    );
}