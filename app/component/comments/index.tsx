'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createComment, deleteComment, getCommentsByPostId, CommentWithUser } from '../../../utils/supabase/comments-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long")
})

type CommentFormData = z.infer<typeof commentSchema>

interface CommentsProps {
  postId: number
  postSlug: string
}

export const Comments = ({ postId, postSlug }: CommentsProps) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId)
  })

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema)
  })

  const createCommentMutation = useMutation({
    mutationFn: async ({ content, parentId }: { content: string; parentId?: number | null }) => {
      return await createComment({
        content,
        post_id: postId,
        parent_id: parentId
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      reset()
      setReplyingTo(null)
      toast.success('Comment added!')
    },
    onError: (error) => {
      toast.error('Failed to add comment')
    }
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      toast.success('Comment deleted!')
    },
    onError: (error) => {
      toast.error('Failed to delete comment')
    }
  })

  const onSubmit = (data: CommentFormData) => {
    createCommentMutation.mutate({
      content: data.content,
      parentId: replyingTo
    })
  }

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId === replyingTo ? null : commentId)
    reset()
  }

  if (isLoading) return <div className="animate-pulse">Loading comments...</div>
  if (error) return <div className="text-red-500">Error loading comments</div>

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6">Comments ({comments?.length || 0})</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="mb-4">
          <textarea
            {...register('content')}
            placeholder={replyingTo ? "Write your reply..." : "Add a comment..."}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          {replyingTo && (
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel reply
            </button>
          )}
          <button
            type="submit"
            disabled={createCommentMutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 ml-auto"
          >
            {createCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={deleteCommentMutation.mutate}
            replyingTo={replyingTo}
            postSlug={postSlug}
            level={0}
          />
        ))}
        
        {(!comments || comments.length === 0) && (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

interface CommentItemProps {
  comment: CommentWithUser
  onReply: (commentId: number) => void
  onDelete: (commentId: number) => void
  replyingTo: number | null
  postSlug: string
  level: number
}

const CommentItem = ({ comment, onReply, onDelete, replyingTo, postSlug, level }: CommentItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const maxLevel = 4

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true)
      try {
        await onDelete(comment.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div 
      className={`border-l-2 border-gray-200 pl-4 ${
        level > 0 ? 'ml-6' : ''
      }`}
      style={{ 
        marginLeft: level > 0 ? `${level * 1.5}rem` : '0',
        maxWidth: `calc(100% - ${level * 1.5}rem)`
      }}
    >
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">
              {comment.users.username}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
            {comment.updated_at !== comment.created_at && (
              <span className="text-gray-400 text-sm">(edited)</span>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 whitespace-pre-wrap mb-3">
          {comment.content}
        </p>
        
        <div className="flex space-x-4 text-sm">
          <button
            onClick={() => onReply(comment.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Reply
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && level < maxLevel && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              replyingTo={replyingTo}
              postSlug={postSlug}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {replyingTo === comment.id && (
        <div className="mt-2 text-sm text-blue-600">
          ↳ Replying to this comment...
        </div>
      )}
    </div>
  )
}

export default Comments