'use server'
import { slugify } from "@/utils/slugify"
import { createClient } from "../utils/supabase/server-client"
import { postSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-images"

export const CreatePost = async (formData: FormData) => {
    // Extract data from FormData
    const title = formData.get('title') as string;
    const content = formData.get('content') as string | null;
    const images = formData;
    
    // Create object for validation
    const dataToValidate = {
        title,
        content: content || undefined,
        images
    };
    
    const parsedData = postSchema.parse(dataToValidate);
    const slug = slugify(parsedData.title);
    const imageFile = formData.get("images"); // Get the file from FormData

    if (imageFile && !(imageFile instanceof File)) {
        throw new Error('Invalid image file');
    }
    const publicImageUrl = imageFile ? await uploadImage(imageFile as File) : null;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const userId = user.id;

    await supabase.from('posts').insert([{ 
        user_id: userId, 
        slug: slug, 
        title: parsedData.title,
        content: parsedData.content,
        images: publicImageUrl 
    }]).throwOnError()

    revalidatePath('/');
    redirect(`/${slug}`);
}