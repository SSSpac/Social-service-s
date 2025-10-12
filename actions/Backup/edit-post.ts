'use server'
import { z } from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/browser-client"
import { slugify } from "@/utils/slugify"
import { revalidatePath } from "next/cache"
import {redirect}  from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-images"


export const EditPost = async ({ postId, userdata }: { postId: number, userdata: z.infer<typeof postSchema> }) => {
    const parsedData = postSchema.parse(userdata)
    const imageFile = userdata.images?.get("image");

   let publicImageUrl;
    if((typeof imageFile !== 'string') && imageFile !== undefined) {
        if (!(imageFile instanceof File) && imageFile !== null) {
            throw new Error('Invalid image file');
        }
        publicImageUrl = await uploadImage(imageFile!);
    }  else {
        publicImageUrl = imageFile;
    }
        

    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    const { data: post, error: postError } = await supabase.from('posts').select('*').eq('id', postId).single()

    if (!user || user.id !== post?.user_id) throw new Error("Not Authorized")

    const { data: updatedPost } = await supabase
        .from('posts')
        .update({ ...parsedData, images: publicImageUrl, slug: slugify(parsedData.title) })
        .eq('id', postId)
        .select('slug')
        .single()
        .throwOnError()

    if (error) throw error

    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}
