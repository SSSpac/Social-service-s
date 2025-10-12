'use client'
import { Tables } from "../../../../../utils/supabase/database.types"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { EditPost } from "@/actions/edit-post"
import { postSchema } from "@/actions/schemas"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const EditForm = ({postId, initialValues} :{postId: number, initialValues:Pick<Tables<'posts'>, "title"
     | "content" | "images"> })  => {
        const schemaWithImage =
        postSchema.omit({ images: true }).extend({image: z.unknown()
      .transform(value => { return value as (FileList) }).optional()});
    
    const {register, handleSubmit} =  useForm({
        resolver: zodResolver(schemaWithImage),
    defaultValues : {
        title: initialValues.title,
        content: initialValues.content || undefined,
        image: initialValues.images
    }
   });
   
   const {mutate, error} = useMutation ({
    mutationFn: EditPost
   })

   
    return (
       
         <form onSubmit={handleSubmit(values => {
             let imageForm = undefined;

             if (values.image?.length && typeof values.image !== 'string')  {
                 imageForm = new FormData();
                 imageForm.append('image', values.image[0]);
             }

            mutate({postId, userdata: {title: values.title, content: values.content, images: imageForm }})
        }
    )}
        className="flex flex-col gap-4">
            <fieldset>
                <label htmlFor="title" className="mb-2 font-semibold">Post Title</label>
                <input type="text" id="title" {...register("title")} className="border border-gray-300 p-2 rounded" placeholder="name of your post?" />
            </fieldset>
            <fieldset>
                <label htmlFor="content" className="mb-2 font-semibold">What is on your mind?</label>
                <textarea id="content" {...register("content")} className="border border-gray-300 p-2 rounded" />
            </fieldset>
            <fieldset>
                {typeof initialValues.images === "string" && initialValues.images && (
                    <img className="w-3xl" src={initialValues.images} alt="Post Image" />
                )}
                <label htmlFor="image" className="mb-2 font-semibold">Post Image</label>
                <input type="file" id="image" {...register("image")} className="border border-gray-300 p-2 rounded" />
            </fieldset>
            
            <fieldset>
            <button className="button-tertiary mt-4" type="submit">Update Post</button> 
             </fieldset>
             {error && <p> {error.message}</p>}
        </form>
    )

}

export default EditForm;