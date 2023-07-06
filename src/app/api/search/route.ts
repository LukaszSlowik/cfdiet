//import { deleteProduct, updateProduct } from '@/lib/prisma/products';
import clsx from "clsx";
import { NextApiRequest } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  // params: {  // params for the [] parts not for query
  //     q: string
  // }
};

export async function GET(req: Request, {}: Props) {
  const { searchParams } = new URL(req.url);

  const queryString = searchParams.get("q");
  if (typeof queryString !== "string") {
    throw new Error("Invalid request");
  }
  const posts = await prisma.post.findMany({
    
    where: {
      OR: [
        {
          body: {
            contains: queryString,
            mode: "insensitive",
          },
        },
        {
            author: {
                name:
                {
                    contains: queryString,
                    mode: "insensitive"
                }
             
            },
          }
      ],
    }, include:{
        author:true
    },
  });

  //const data = await req.json()

  console.log("In the api", searchParams.get("q"));
  return NextResponse.json({ posts: posts });
  //    return new Response(JSON.stringify(message:'Hello'),{
  //     status:200
  //    })
}
