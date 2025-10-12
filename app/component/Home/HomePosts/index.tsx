'use client'
 
import { useQuery } from "@tanstack/react-query";
import { getHomePosts, HomePostsType } from "../../../../utils/supabase/queries"
import Link from "next/link";
import { createClient } from "@/utils/supabase/server-client";




const HomePosts = ({ posts }: { posts: HomePostsType }) => {
    const data = posts;
    const isFetching = false;
    const error = null;

    if (error) return null;
    return (
        <div>
            {
                isFetching ?
                    <div>Loading</div>
                    :
                    data && data.map(({ id, title, slug, users }) =>
                        <Link href={`/${slug}`} className="block border-1 rounded-md mt-4 p-4" key={id}>
                            <h2 className="font-bold text-xl">{title}</h2>
                            <div className="text-right">by {users.username}</div>
                        </Link>)
            }
        </div>
    )
}

export default HomePosts;