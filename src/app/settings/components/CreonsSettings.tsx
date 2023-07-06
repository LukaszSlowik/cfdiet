"use client";

import { CreonSchema, CreonZod } from "@/lib/validators/creonSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
//import { DevTool } from "@hookform/devtools";
import ObjectID from "bson-objectid";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCreonsettings, postUpdateCreonsettings } from "@/lib/fetch/fetch";

type Props = {};

export default function CreonsSettings({}: Props) {
  const router = useRouter();

const session = useSession()
const userSessionId = session.data?.user.id

//get creon session if exist and populate form
const queryClient = useQueryClient()
const {data:creonSettings,isLoading,error} = useQuery({queryKey:["creonSettings",userSessionId],
queryFn: getCreonsettings,
staleTime: 60000,

})


const {mutate:UpdateCreonSettings} = useMutation({
    mutationFn: async (creonSettings:CreonZod) => await  postUpdateCreonsettings(creonSettings),
    onSuccess: () => {
        queryClient.invalidateQueries(["creonSettings",userSessionId])
        router.push("/meal")
    }
})










  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreonZod>({
    resolver: zodResolver(CreonSchema),
    values:creonSettings
  });

  const submitData = (data: CreonZod) => {

    console.log("data:",data)
    // if(data.id === ""){
    //     data.id = ObjectID().toHexString();
    // }
    
    console.log("data id: ", data.id);
    UpdateCreonSettings(data)














  };

  if(isLoading) return <div>
    <div className="text-center">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Ładuje...</span>
    </div>
</div>

  </div>
  if(error) return <div> Error </div>

  return (
    <div className="flex justify-center flex-col ">
      <div>
        <svg
          onClick={() => router.back()}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </div>

      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex  flex-col  gap-2 ">
        <input
            type="hidden"
            
            {...register("id")}
            
          />
          <label>Units per gram: </label>
          <input
            type="number"
            {...register("unitsPerFatGram",{valueAsNumber:true})}
            className="text-black bg-slate-200"
          />
          {errors.unitsPerFatGram && (
            <span className="text-red-400">{errors.unitsPerFatGram.message}</span>
          )}
          <label>Units in tablet: </label>
          <select {...register("unitsPerTablet",{valueAsNumber:true})} className="text-black">
            <option value={10000}>10000</option>
            <option value={50000}>50000</option>
          </select>
          {errors.unitsPerTablet && (
            <span className="text-red-400">
              {errors.unitsPerTablet.message}
            </span>
          )}
        </div>
        <input type="submit" className="cursor-pointer mt-6" />
      </form>
      {/* <DevTool control={control} /> set up the dev tool */}
    </div>
  );
}
