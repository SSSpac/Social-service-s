'use client'
import { CreatePost } from "@/actions/create-post";
import { postSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import ErrorMessage from "@/app/component/ErrorMessage";
import z from "zod";
import Image from "next/image";

const CreatePage = () => {
   const schemaWithImage = postSchema.omit({ images: true }).extend({
     images: z.unknown()
       .transform(value => { return value as FileList })
       .optional()
   });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaWithImage)
    });

    const { mutate, error, isPending } = useMutation({
        mutationFn: CreatePost,
        onSuccess: () => {
            toast.success("Post created successfully!");
            reset();
        },
        onError: (error) => {
            toast.error("Failed to create post");
       
        }
    })

    const onSubmit = (values: any) => {
        const formData = new FormData();
        
        formData.append('title', values.title);
        formData.append('content', values.content);

        if (values.images?.length) {
            formData.append('images', values.images[0]);
        }

        mutate(formData as any);
    }

    return ( 
      <div className=" rounded-xl p-4 w-[700px] mx-auto">
        <h2 className="text-2xl text-center text-white font-bold">Create a New Post</h2>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="text-2xl font-bold text-gray-900 leading-tight mb-2 p-4 flex flex-col w-[700px] mx-auto shadow-2xl shadow-black my-[50] rounded-2xl"
        >
          <fieldset className="space-y-2 mb-4">
            <label className="flex text-gray-400 items-center gap-4  flex-wrap" htmlFor="title">
              Title:
            </label>
            <div className="flex gap-3">
              <input 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50" 
                id="title" 
                {...register('title')} 
                placeholder="What's your post title?" 
              />  
            </div>
            {errors.title && <ErrorMessage message={errors.title.message!} />}
          </fieldset>
          
          <fieldset>
            <div className="space-y-2">
              <label className="font-semibold text-gray-400 flex items-center gap-2" htmlFor="content">
                What do you have to say?
              </label>
              <textarea 
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 resize-none" 
                id="content" 
                {...register('content')} 
                placeholder="..." 
              />
              {errors.content && <ErrorMessage message={errors.content.message!} />}
            </div>
          </fieldset>
          
          <fieldset className="mt-2 flex items-center gap-2">
            <label className="font-bold cursor-pointer border text-gray-400 p-1" htmlFor="image">
              Upload image
            </label>
            <input 
              type="file" 
              {...register("images")} 
              id="image" 
            />
            {errors.images && <ErrorMessage message={errors.images.message!} />}
          </fieldset>
          
          <button 
            type="submit"
            disabled={isPending}
            className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create post!"}
          </button>
        </form>
      </div>
    );
}

export default CreatePage; 