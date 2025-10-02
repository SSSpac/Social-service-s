'use client'
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "@/actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

import { CreatePostAction } from "@/actions/create-post";




const CreatePost = () => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(postSchema)
    });

// In your CreatePost component page.tsx
const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePostAction,
    onMutate: () => toast.loading('Creating post...', { id: 1 }),
    onSuccess: () => {
        toast.success('Post uploaded successfully!', { id: 1 });
    },
    onError: (error) => {
        toast.error(`Failed to create post: ${error.message}`, { id: 1 });
        console.error('Create post error:', error);
    }
});

// Add loading state to button
<button 
    className="button-secondary w-1/2 m-auto" 
    disabled={isPending}
>
    {isPending ? 'Creating...' : 'Create post!'}
</button> 

    return (
        <form onSubmit={handleSubmit(values => mutate(values))} className="p-4 flex flex-col w-[700px] mx-auto">
            <fieldset>
                <label htmlFor="title">Post title</label>
                <input id="title" {...register('title')} placeholder="What's your post title?" />
            </fieldset>
            <fieldset>
                <label htmlFor="content">What do you have to say?</label>
                <textarea className="w-full h-100" id="content" {...register('content')} placeholder="Crickets in here..." />
            </fieldset>
            <button className="button-secondary w-1/2 m-auto">Create post!</button>
        </form>
    )
}
export default CreatePost;