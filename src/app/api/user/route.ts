import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
interface RequestBody{
    name:string,
    email:string,
    password:string,
}
export async function POST(request:Request) {
    let user:any
 try {
    const body:RequestBody = await request.json()

    const checkUser = await prisma.user.findFirst({
        where:{
            email:body.email,
        }}
    )

    if(!checkUser)
    {
        user =  await prisma.user.create({
            data:
            {
                name:body.name,
                email:body.email,
                
                password: await bcrypt.hash(body.password,10),
                creon:{
                    create:{
                        unitsPerFatGram:1800,
                        unitsPerTablet:10000
                    }
                }
            }
        })
    }
    else {
        return NextResponse.json({ message: 'User already exists' }, { status: 200 })
    }
   




    // const user = await prisma.user.upsert({
    //     where: { email: body.email },
    //     create: {
    //         name: body.name,
    //         email: body.email,
    //         password: await bcrypt.hash(body.password, 10)
    //     },
    //     update: {}
    // })
    const {password,...result} = user
    return NextResponse.json(result)
 } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
 }
      



}