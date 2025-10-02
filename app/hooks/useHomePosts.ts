import { useQuery } from "@tanstack/react-query";
import { getHomePosts, HomePostsType } from "../utils/supabase/queries";
import { createClient } from "../utils/supabase/browser-client";

export const useHomePosts = (posts: HomePostsType) => {
    const { data, isFetching, error } = useQuery({
        queryKey: ['home-posts'],
        queryFn: async () => {
            const supabase = createClient();
            const { data, error } = await getHomePosts(supabase)
            if (error) throw error.message;
            return data;
        },
        staleTime: 1000 * 10,
        refetchOnMount: false,
        initialData: posts
    },
    )

    return { data, isFetching, error }
}