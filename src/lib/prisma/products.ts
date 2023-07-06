//import { Product } from "../validators/newProduct";
import { Product ,Prisma} from "@prisma/client";
import { prisma } from ".";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function createProduct(product: Prisma.ProductUncheckedCreateInput) {

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
const {productName, fat,kcal,weightGlass,weightHandful,weightPiece,weightSmallspoon ,weightSpoon}= product
  try {
    console.log("product to create:", product);
   
    const productFromDB = await prisma.product.create({ data: product

    });
    //console.log("test founded:", productFromDB);

    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    //console.log("products",products)
    return { products };
  } catch (error) {
    return { error };
  }
}
export async function getProduct(id: string) {
  try {
    const dataFromPrisma = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    return { dataFromPrisma };
  } catch (error) {
    return { error };
  }
}



export async function deleteProduct(id: string) {
  try {
    const dataFromPrisma = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return { dataFromPrisma };
  } catch (error) {
    return { error };
  }
}
export async function updateProduct(product: Product) {
  try {
    const dataFromPrisma = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        productName: product.productName,
        fat: product.fat,
        kcal: product.kcal,
        weightGlass: product.weightGlass,
        weightHandful: product.weightHandful,
        weightPiece: product.weightPiece,
        weightSmallspoon: product.weightSmallspoon,
        weightSpoon: product.weightSpoon,
      },
    });

    //console.log("data from prisma:", dataFromPrisma)
    return { dataFromPrisma };
  } catch (error) {
    return { error };
  }
}

export async function updatePopularity(id: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  console.log("User for update popularity:", userId);
  try {
    if (userId) {
      const dd = await prisma.product.findFirst({
        where: {
          AND:
          [
            {
              productPopularity: {
                some:
                {userId: userId}
            }},

           {
              id: id
            },
          ]
         
              
            
            
            
          
        },
      });
console.log("dd",dd)


      if (dd) {
        const dataFromPrisma = await prisma.product.update({
          where: {
            id: id,
          },
          data: {
            userId: userId,
            productPopularity: {
              updateMany: {
                where: {
                  userId: userId,
                },
                data: {
                  popularity: { increment: 1 },
                },
              },
            },
          },
        });
        return { dataFromPrisma };
      } else {
        const dataFromPrisma = await prisma.product.update({
          where: {
            id: id,
          },
          data: {
            userId: userId,
            productPopularity: {
              push: {
                userId: userId,
                popularity: 1,
              },
            },
          },
        });


        return { dataFromPrisma };
      }
    } else {
      return { message: "KO" };
    }

    //console.log("data from prisma:", dataFromPrisma)
  } catch (error) {
    return { error };
  }
}
