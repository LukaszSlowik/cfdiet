import { createProduct } from "@/lib/prisma/products"
import { Product, User } from "@prisma/client"
import { NextResponse } from "next/server"
//import { Product } from "@/lib/validators/newProduct"
//import {getSession} from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ProductSchema } from "@/lib/validators/newProduct"




export async function POST(request:Request){
    const data:Product  & {user:User} = await request.json()
//let dataWithoutId:Partial<Product> ={}
const {id, user, ...productWithoutIdAnUser} = data


    console.log("Post request : ", data)
    //const zodTest = await request.json()
  //const zodTestWithType = ProductSchema.parse(zodTest)
 

const session = await getServerSession(authOptions)
  data.userId = session?.user.id as string
  productWithoutIdAnUser.userId = data.userId
    console.log("data to add have session:",session)
    const {product,error} = await createProduct(productWithoutIdAnUser)

    
    
    return NextResponse.json({product})
}