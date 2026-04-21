import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Models from "@/lib/models/products"; 
const { ProductDecor, ProductWom, ProductMan, ProductTools } = Models; 

export async function GET() {
  try {
    await connectDB();

    const [decor, wom, man, tools] = await Promise.all([
      ProductDecor.find({}).lean(),
      ProductWom.find({}).lean(),
      ProductMan.find({}).lean(),
      ProductTools.find({}).lean(),
    ]);

    const products = [...decor, ...wom, ...man, ...tools];

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let TargetModel;

    switch (body.maincategory) {
      case "Декоративна косметика":
        TargetModel = ProductDecor;
        break;
      case "Жіноча доглядова косметика":
        TargetModel = ProductWom;
        break;
      case "Чоловіча доглядова косметика":
        TargetModel = ProductMan;
        break;
      case "Інструменти для догляду":
        TargetModel = ProductTools;
        break;
      default:
        return NextResponse.json(
          { error: "Невідома категорія" },
          { status: 400 },
        );
    }

    const product = await TargetModel.create(body);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}