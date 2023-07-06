import { Product } from "@prisma/client";
import { CreonZod } from "../validators/creonSettings";

export async function getCreonsettings() {
  const result = await fetch(`/api/creonsettings`);
  return await result.json();
}

export async function sendEmailForgetPassword(email: string) {
  const response = await fetch(`/api/sendEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  return await response.json()
}

export async function resetPassword(token:string,password:string,confimedPassword:string){
  const response = await fetch(`/api/user/reset/${token}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",

    },
    body:JSON.stringify({password:password,confimedPassword:confimedPassword})
  })
  return await response.json()
}

export async function postUpdateCreonsettings(creonSettings: CreonZod) {
  console.log("data for UpdateCreonSettings: ", creonSettings);
  const response = await fetch(`/api/creonsettings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creonSettings),
  });
  return response.body;
}

export async function getProducts() {
  const result = await fetch(`/api/products/getProducts`);
  return await result.json();
}

export async function getProductbyId(id: string) {
  const result = await fetch(`/api/products/product/${id}`);
  return await result.json();
}

export async function updateProduct(product: Product, productId: string) {
  const response = await fetch(`/api/products/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  //   const delay = (ms:number) => new Promise(res=> setTimeout(res,ms))

  //   for (let i = 0; i < 10; i++) {
  //     await delay(1000)
  //     console.log(i);
  // }
  return response.body;
}
