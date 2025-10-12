'use client'
import { DeletePost } from '@/actions/delete-post'
import { toast } from "sonner"
import { useMutation } from '@tanstack/react-query'


const DeleteButton = ({ postId }: { postId: number }) => {

    const { mutate, error } = useMutation(
        {
            mutationFn: DeletePost,
            onSettled: () => toast.success('Deleted post!'),
            onError: () => toast.error("Could not delete post!"),
        },
    );
    return (
        <button onClick={() => mutate(postId)} className="button-secondary">Delete Post</button>
    )
}

export default DeleteButton;        