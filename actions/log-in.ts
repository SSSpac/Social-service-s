// actions/log-in.ts
'use server'
import { createClient } from "../app/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { logInSchema } from "./schemas"
import z from "zod"

export const LogIn = async (userdata: z.infer<typeof logInSchema>) => {
    const parsedData = logInSchema.parse(userdata)
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword(parsedData)

    if (error) {
        throw new Error(error.message)
    }
    
    redirect("/")
}