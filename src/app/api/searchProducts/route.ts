//import { deleteProduct, updateProduct } from '@/lib/prisma/products';
import clsx from "clsx";
import { NextApiRequest } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Product, ProductPopularity, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type Props = {
  // params: {  // params for the [] parts not for query
  //     q: string
  // }
};

export async function GET(req: Request, {}: Props) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });
  const userId = session?.user.id;

  const queryString = searchParams.get("q");
  const globalParametr = searchParams.get("global");
  console.log("Query String:", queryString);
  console.log("globalParametr:", globalParametr);
  if (typeof queryString !== "string" || queryString === "") {
    return NextResponse.json([]);
  }
  if (queryString === null) {
    console.log("return:", JSON.stringify([]));
    return NextResponse.json([]);
  }
  let products: (Product & { user: User })[] = [];

  if (globalParametr === "true") {
    products = await prisma.product.findMany({
      where: {
        productName: {
          contains: queryString,
          mode: "insensitive",
        },
      },
      include: {
        user: true,
      },
    });
  } else {
    products = await prisma.product.findMany({
      where: {
        productName: {
          contains: queryString,
          mode: "insensitive",
        },
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }

  console.log("products from search:", products);
  // const ddd = products.sort((a:Product,b:Product)=> (a.productPopularity.> b.id) ? -1:1);

  //const data = await req.json()

  if (userId && products[0]?.productPopularity) {
    products.sort((a, b) => {
      const popularityA =
        a.productPopularity.filter(
          (a: ProductPopularity) => a.userId == userId
        )[0]?.popularity || 0;
      console.log("a.productPopularityA: ", a.productPopularity);

      const popularityB =
        b.productPopularity.filter(
          (a: ProductPopularity) => a.userId == userId
        )[0]?.popularity || 0;
      console.log("productPopularityB: ", b.productPopularity);

      return popularityB - popularityA;
    });

    // Output the sorted array
    //console.log(products);
  }

  console.log("In the api", searchParams.get("q"));
  if (!products) {
    return NextResponse.json([]);
  }
  //return NextResponse.json({ products: products });
  return NextResponse.json(products);
  //    return new Response(JSON.stringify(message:'Hello'),{
  //     status:200
  //    })
}
