import { deleteProduct, getProduct, updateProduct } from '@/lib/prisma/products';
import { NextResponse } from 'next/server';

type Props = {
    params: {
        id: string
    }
}


export async function DELETE(req:Request,{params:{id}}:Props){

    const {dataFromPrisma,error} = await deleteProduct(id)

console.log(id)

    return NextResponse.json(dataFromPrisma)
}


export async function GET(req:Request,{params:{id}}:Props){
    //const data = await req.json()
console.log(id)
const {dataFromPrisma,error} = await getProduct(id)
    return new Response(JSON.stringify(dataFromPrisma))
}


export async function PUT(req:Request,{params:{id}}:Props){
    //const data = await req.json()
    const data = await req.json()
    //console.log("Data for PUT:", data)
    const {dataFromPrisma,error} = await updateProduct(data)

    // return NextResponse.json(dataFromPrisma)
    return new Response(JSON.stringify(dataFromPrisma))
}