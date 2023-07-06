import { Creon,Prisma } from "@prisma/client";
import { prisma } from ".";
import ObjectId from "bson-objectid";
export async function udpatecreonsettings(creonsettings: Creon) {
  try {
    console.log("setting to change: ", creonsettings);


 const {id,unitsPerFatGram,unitsPerTablet,userId}= creonsettings

 let upsertData:Prisma.CreonUncheckedCreateInput= {
  unitsPerTablet:unitsPerTablet,
  unitsPerFatGram:unitsPerFatGram,
  userId:userId
}
if (id !== "") {
  console.log("id not empty")
  upsertData.id = id;
}
console.log("data for upsert creon: ", upsertData)

    const creonsettingsFromDB = await prisma.creon.upsert({
        where:{id:id ||  ObjectId().toString()},   
        update: 
        //{
          // unitsPerFatGram: upsertData.unitsPerFatGram,
          // unitsPerTablet: upsertData.unitsPerTablet,
          // userId:upsertData.userId
          upsertData
        //}
        ,
        create:
        upsertData
        // {
          
        //   unitsPerFatGram:upsertData.unitsPerFatGram,
        //   unitsPerTablet: upsertData.unitsPerTablet,
        //   userId:upsertData.userId
        // }
    }
    
    
    )
    return {creonsettingsFromDB}

    // if (creonsettings.id === "") {
    //     const newcreonsettingsFromDB = await prisma.creon.create({
    //       data: {
    //           userId: creonsettings.userId,
    //           unitsPerFatGram: creonsettings.unitsPerFatGram,
    //           unitsPerTablet: creonsettings.unitsPerTablet
    //       },
    //     });
    //     return { creonsettings: newcreonsettingsFromDB };
    // }
    // const creonsettingsFromDB = await prisma.creon.findFirst({
    //   where: { id: creonsettings.id },
    // });

    // if (!creonsettingsFromDB) {
    //   const newcreonsettingsFromDB = await prisma.creon.create({
    //     data: {
    //         userId: creonsettings.userId,
    //         unitsPerFatGram: creonsettings.unitsPerFatGram,
    //         unitsPerTablet: creonsettings.unitsPerTablet
    //     },
    //   });
    //   return { creonsettings: newcreonsettingsFromDB };
    // } else {
    //   const updatecreonsettingsFromDB = await prisma.creon.update({
    //     where: {
    //       id: creonsettings.id,
    //     },
    //     data: {
    //         unitsPerFatGram: creonsettings.unitsPerFatGram,
    //         unitsPerTablet:creonsettings.unitsPerTablet
    //     },
    //   });

    //   console.log("updatecreonsettingsFromDB:", updatecreonsettingsFromDB)
    //   return { creonsettings: updatecreonsettingsFromDB };
    // }
  }
  
  catch (error) {
    console.log(error);
    return { error };
  }
}

export async function  getcreonsettings(userId:string){

    try {
        
        const creonsettingsFromDB = await prisma.creon.findFirst({
          where: { userId: userId },
        });
        return {creonsettings: creonsettingsFromDB}

}
catch (error) {
    console.log(error);
    return { error };
  }}
