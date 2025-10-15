import { createClient } from "./browser-client";
import { QueryData } from '@supabase/supabase-js';

export type CommentWithUser = {
  id: number
  content: string
  created_at: string
  updated_at: string
  user_id: string
  post_id: number
  parent_id: number | null
  users: {
    username: string
  }
  replies?: CommentWithUser[]
}

export const getCommentsByPostId = async (postId: number) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      users (
        username
      )
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  const comments = data || [];
  const commentMap = new Map();
  const rootComments: CommentWithUser[] = [];

  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach(comment => {
    const commentWithReplies = commentMap.get(comment.id);
    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.replies.push(commentWithReplies);
      }
    } else {
      rootComments.push(commentWithReplies);
    }
  });

  return rootComments;
}

export const createComment = async (commentData: {
  content: string
  post_id: number
  parent_id?: number | null
}) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User must be logged in to comment');

  const { data, error } = await supabase
    .from('comments')
    .insert([{
      ...commentData,
      user_id: user.id
    }])
    .select(`
      *,
      users (
        username
      )
    `)
    .single();

  if (error) throw error;
  return data;
}

export const deleteComment = async (commentId: number) => {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) throw error;
}

export const updateComment = async (commentId: number, content: string) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('comments')
    .update({ 
      content,
      updated_at: new Date().toISOString()
    })
    .eq('id', commentId)
    .select(`
      *,
      users (
        username)
    `)
    .single();

  if (error) throw error;
  return data;
}