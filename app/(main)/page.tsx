import HomePosts from "../component/Home/HomePosts"
import { getHomePosts } from "../../utils/supabase/queries";
import { createClient } from "../../utils/supabase/server-client"
import Link from "next/link"
import { CalendarDays, User, ArrowRight } from "lucide-react"

export const revalidate = 600;
    
export default async function Home() {
  const supabase = await createClient(); 
  const { data, error } = await getHomePosts(supabase);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-rose-500 text-lg">Failed to load posts</div>
        <p className="text-gray-600 mt-2">Please try refreshing the page</p>
      </div>
    </div>
  );

  if (!data || data.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No posts yet</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  border-radius py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Share your thoughts!
          </h1>
          
        </div>
        <div className="grid gap-6 ">
          {data.map(({ id, title, slug, users, created_at }) => (
            <Link 
              href={`/${slug}`} 
              key={id}
              className="block group"
            >
              <div className=" text-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-white hover:border-blue-200 group-hover:scale-[1.02]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="font-bold text-xl text-white group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                      {title}
                    </h2>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span className="font-medium text-gray-400">
                          {users.username}
                        </span>
                      </div>
                      
                      {created_at && (
                        <div className="flex items-center gap-1">
                          <CalendarDays size={16} />
                          <time>
                            {new Date(created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                      )}
                    </div>
                  </div>
                                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={20} className="text-blue-500" />
                  </div>
                </div>
                                
                </div>
              
            </Link>
          ))}
        </div>

        </div>
    </div>
  );
}