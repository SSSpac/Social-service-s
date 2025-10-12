'use server'
import { slugify } from "@/utils/slugify"
import { createClient } from "../utils/supabase/server-client"
import { postSchema } from "./schemas"
import z from "zod"
import { revalidate } from "@/app/(main)/page"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-images"


export const CreatePost = async (userdata: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(userdata);
    const slug = slugify(parsedData.title);
    const imageFile = userdata.images?.get("images");

    if (!(imageFile instanceof File) && imageFile !== null) {
        throw new Error('Invalid image file');
    }
    const publicImageUrl = imageFile ? await uploadImage(imageFile) : null;


    const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

    const userId = user.id;

    await supabase.from('posts').insert([{ user_id: userId, slug: slug, ...parsedData, images: publicImageUrl }]).throwOnError()

    revalidatePath('/');
    redirect(`/${slug}`);
}