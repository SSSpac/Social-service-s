import { createClient } from "./browser-client";
import {type QueryData} from '@supabase/supabase-js'



export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {

    return await supabase
        .from('posts')
        .select('id, title, slug, users(username, email)')
        .order('created_at', { ascending: false })

}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient();
    return await supabase.from('posts')
        .select('*, users(username)')       
        .eq('slug', slug)
        .single();
}

export const getSearchedPosts = async (searchTerm: string, signal: AbortSignal) => {
    const supabase = createClient();

    return await supabase.from('posts')
        .select('title, slug')
        .ilike('title', `%${searchTerm}%`).abortSignal(signal);
}

export const getAllUsersWithUsername = async (name: string) => {
    const supabase = createClient();
    return supabase.from('users').select('*').ilike('username', `%${name}`);
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>
export type SinglePostsType = QueryData<ReturnType<typeof getSinglePost>> 