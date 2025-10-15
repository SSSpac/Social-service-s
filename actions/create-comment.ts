'use server'

import { createClient } from "@/utils/supabase/server-client"
import { z } from "zod"

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
  post_id: z.number(),
  parent_id: z.number().nullable().optional()
})

export const CreateComment = async (formData: FormData) => {
  const content = formData.get('content') as string;
  const post_id = parseInt(formData.get('post_id') as string);
  const parent_id = formData.get('parent_id') ? parseInt(formData.get('parent_id') as string) : null;

  const parsedData = commentSchema.parse({
    content,
    post_id,
    parent_id
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User must be logged in to comment');

  const { data, error } = await supabase
    .from('comments')
    .insert([{
      ...parsedData,
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