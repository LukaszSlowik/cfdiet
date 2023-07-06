import {z} from 'zod'

export const CreonSchema = z.object({
    id:z.string().optional(),
    userId:z.string().optional(),
    unitsPerTablet:z.number({required_error: "Value is required", invalid_type_error:"Value is required"}),
    unitsPerFatGram:z.number({required_error: "Value is required", invalid_type_error:"Value is required"}),
})

export type CreonZod = z.infer<typeof CreonSchema>