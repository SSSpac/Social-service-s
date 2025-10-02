'use client'
import Link from "next/link";
import { HomePostsType } from "../../../utils/supabase/queries";
import { useHomePosts } from "../../../hooks/useHomePosts";


const HomePosts = ({ posts }: { posts: HomePostsType }) => {
    const { data, error, isFetching } = useHomePosts(posts);

    if (error) return;
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