import HomePosts from "../component/Home/HomePosts"
import { getHomePosts } from "../../utils/supabase/queries";
import { createClient } from "../../utils/supabase/server-client"
import Link from "next/link"

export const revalidate = 600;
    
export default async function Home() {
  const supabase = await createClient(); 
  const { data, error } = await getHomePosts(supabase);

  if (error) return;
  return (
    <div className="w-[80%] m-auto">
      {data && data.map(({ id, title, slug, users }) =>
        <Link href={`/${slug}`} className="block border-1 rounded-md mt-4 p-4" key={id}>
          <h2 className="font-bold text-xl">{title}</h2>
          <div className="text-right">by {users.username}</div>
        </Link>)}
    </div>
  );
}