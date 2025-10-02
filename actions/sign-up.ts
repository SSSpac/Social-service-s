'use server'

import { createClient } from "@/app/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { signUpSchema } from "./schemas"
import z from "zod"

export const Signup = async (userdata:z.infer<typeof signUpSchema>) => {
   
    const supabase =  await createClient()
    const {data: {user}, error} = await supabase.auth.signUp(userdata)

    if (user && user.email) {
        const {data, error} = await supabase.from('users')
        .insert ([{id:user.id, email: user.email, username:userdata.username }])
         
    }
    if (error) throw error
    
    redirect("/")
}

