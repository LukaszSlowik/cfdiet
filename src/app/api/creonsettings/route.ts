import { Creon } from "@prisma/client";
import {
  getcreonsettings,
  udpatecreonsettings,
} from "@/lib/prisma/creonsettings";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ObjectID from "bson-objectid";

export async function POST(
  request: Request
) {
  const data: Creon = await request.json();



  console.log("data to put in mongo: ", data)
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Only for login users" });
  }

  data.userId = session?.user.id as string;


  console.log("Post request for updating creon");
  const { creonsettingsFromDB, error } = await udpatecreonsettings(data);
console.log("creonsettings:", creonsettingsFromDB)
  return NextResponse.json( creonsettingsFromDB );
}

export async function GET(
  request: Request,
) {
    //const data: Creon = await request.json();
    const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Only for login users" });
  }

  const userId = session?.user.id as string;
  const { creonsettings, error } = await getcreonsettings(
  userId
  );
  if (!creonsettings) {
    return NextResponse.json({ unitsPerTablet:0, unitsPerFatGram:0 });
  }

 // console.log("Params id:", params.userId);
  return NextResponse.json(creonsettings);
}
