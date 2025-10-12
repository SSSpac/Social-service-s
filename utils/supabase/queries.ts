
import { createClient } from "./browser-client";
import { QueryData } from '@supabase/supabase-js';


export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {

    return await supabase
        .from('posts')
        .select('id, title, slug, users("username"), images, created_at')
        .order('created_at', { ascending: false })

}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient();
    return await supabase.from('posts')
        .select('id,title, content, slug, user_id, users(username), images, created_at')       
        .eq('slug', slug)   
        .single();
}

export const getSearchedPosts = async (searchTerm: string, signal: AbortSignal) => {
    const supabase = createClient();

    return await supabase.from('posts')
        .select('title, slug')
        .ilike('title', `%${searchTerm}%`).abortSignal(signal);
}


export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>
export type SinglePostsType = QueryData<ReturnType<typeof getSinglePost>> 