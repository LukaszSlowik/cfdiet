import { sendEmail } from "@/lib/sendgrid"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url";
import { IncomingMessage } from "http";


interface SignOption {
    expiresIn?: string | number;
  }


export async function POST(request:Request)


{console.log("request: ", request)
const { searchParams,origin } = new URL(request.url);
    const body = await request.json()
    //const urlFromRequest = absoluteUrl(request)
    //console.log("url from request: ", urlFromRequest)
    console.log("Body from api: ", body)
    try{

const user = await prisma.user.findFirst({
    where:{
        email:body.email
    }
})

if(!user) {
    return NextResponse.json({message:"User doesn't exist"},{status:500})
}
const {password, ...userWithoutPass} = user
const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "1h",
  };

const secret_key = process.env.SECRET_KEY;
const tokenForReset = jwt.sign(userWithoutPass,secret_key!,DEFAULT_SIGN_OPTION)
user.resetToken = tokenForReset

const updatedUser = await prisma.user.update({
    where:{id:user.id},
    data:{
        resetToken:tokenForReset
    }
})    
const link = `${origin}/user/reset/${tokenForReset}`
console.log(link)

const message = `<div>Click the link below to reset your password, if the link is not working then please paste the link into the browser</div><br>
<div>link:${link}</div>
`

        await sendEmail(body.email,"Reset Password",message)
        return NextResponse.json({message:`Email set to ${user.email}, please check you email`},{status:200})
    }catch(error){
        return NextResponse.json({message:"KO"},{status:500})
    }
}