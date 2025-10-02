'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "@/app/utils/supabase/server-client"
import { redirect } from "next/navigation"


    export const DeletePost = async (postId : number) => {
    const supabase  = await  createClient ()
    await supabase 
    .from("posts")
    .delete()
    .eq('id', postId)
    .throwOnError ()
    revalidatePath("/")
   
    redirect ("/")

}