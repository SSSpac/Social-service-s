'use server'

import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const DeleteComment = async (commentId: number, postSlug: string) => {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) throw error;

  revalidatePath(`/${postSlug}`);
}