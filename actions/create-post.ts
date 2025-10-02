'use server'
import { slugify } from "@/app/utils/slugify"
import { createClient } from "../app/utils/supabase/server-client"
import { postSchema } from "./schemas"
import z from "zod"
import { revalidate } from "@/app/(main)/page"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const CreatePostAction = async (postDataValues: z.infer<typeof postSchema>) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    const parsedData = postSchema.parse(postDataValues);
    const slug = slugify(parsedData.title);

    if (!user) throw new Error('Not Authorized')

    await supabase.from('posts').insert([{ user_id: user.id, slug, ...parsedData }]).throwOnError()

    revalidatePath('/');
    redirect(`/${slug}`);
}