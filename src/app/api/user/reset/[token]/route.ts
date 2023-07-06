import * as bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function PUT(request:Request){

try{
    const body = await request.json()
    const updatedUser = await prisma.user.update({
        where:{resetToken:body.token},
        data:{
            password:await bcrypt.hash(body.password,10)
        }
    })
return NextResponse.json({message:"Password has been changed"})
}catch(error){
return NextResponse.json({message:"Error"},{status:500})
}

}