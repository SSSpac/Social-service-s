'use client'
 
import { useQuery } from "@tanstack/react-query";
import { getHomePosts, HomePostType } from "../../../utils/supabase/queries"
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server-client";

const HomePosts = ({posts} : {posts: HomePostType}) => { 
    const {data} = useQuery({
        queryKey:['home-posts'],
        queryFn: async () => {
            const supabase =  await createClient()
            const {data,error} = await  getHomePosts(supabase); 
           
            if(error) throw error
            return data
    },
    initialData: posts,
    refetchOnMount:false,
    staleTime: 10000
})
    return (
        <div>
            {data && data.map(({id, title,slug, users}) => 
            <Link href={`/${slug}`} 
             className="block border-1 rounded mt-2 p-4" key={id}>
             <h2 className="text-xl font-bold">{title}</h2>
             <p className="text-gray-500">({slug}) by {users.username}</p>
                </Link>)}
        </div>
    )
    
}

export default HomePosts;