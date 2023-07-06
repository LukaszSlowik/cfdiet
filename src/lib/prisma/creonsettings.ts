import { Prisma } from "@prisma/client";
import { prisma } from ".";
import ObjectId from "bson-objectid";
import { CreonZod } from "../validators/creonSettings";
export async function udpatecreonsettings(creonsettings: CreonZod) {
  try {
    console.log("setting to change: ", creonsettings);

    const { id, unitsPerFatGram, unitsPerTablet, userId } = creonsettings;

    let settingsToUpdate: any = {
      unitsPerTablet: unitsPerTablet,
      unitsPerFatGram: unitsPerFatGram,
      userId: userId,
    };

    const creonsettingsFromDB = await prisma.creon.upsert({
      where: { id: id || ObjectId().toString() },
      update: settingsToUpdate,

      create: settingsToUpdate,
    });
    return { creonsettingsFromDB };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function getcreonsettings(userId: string) {
  try {
    const creonsettingsFromDB = await prisma.creon.findFirst({
      where: { userId: userId },
    });
    return { creonsettings: creonsettingsFromDB };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
