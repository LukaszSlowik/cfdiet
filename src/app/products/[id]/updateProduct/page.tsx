
import UpdateProductForm from "@/components/UpdateProductForm";
import { Product } from "@prisma/client";

type Props = {
  params: {
    id: string
}
}

export default function UpdateProduct({params:{id}}: Props) {

 

  
  return (
    <UpdateProductForm productId = {id}   />
  )
}
