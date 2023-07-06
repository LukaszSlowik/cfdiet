import { deleteProduct, updatePopularity, updateProduct } from '@/lib/prisma/products';
import { NextResponse } from 'next/server';

type Props = {
    params: {
        id: string
    }
}



export async function PUT(req:Request,{params:{id}}:Props){
    //const data = await req.json()
    //const data = await req.json()
    //console.log("Data for PUT:", data)
    const {dataFromPrisma,error} = await updatePopularity(id)
console.log("update popularity: ", dataFromPrisma)
    // return NextResponse.json(dataFromPrisma)
    return new Response(JSON.stringify(dataFromPrisma))
}