import { getProducts } from "@/lib/prisma/products"
import { NextResponse } from "next/server"

export async function GET(req:Request)
{

    const {products,error} = await getProducts()
if(products)
{
    return NextResponse.json(products)
}
    return NextResponse.json({message:"Nothing"})
}