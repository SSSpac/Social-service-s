import { createClient } from "../../../utils/supabase/server-client"
import { getSinglePost } from "../../../utils/supabase/queries"
import DeleteButton from "./Deletebutton"
import EditButton from "./EditButton"
import { Calendar, User } from "lucide-react"

const SinglePost = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const { data, error } = await getSinglePost(slug)
    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isAuthor = user?.id === data?.user_id ? true : false;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!data) {
        return (
            <div className="min-h-screen bg-blue-500 from-gray-50 to-blue-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
                    <p className="text-gray-600">The post you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen   py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            {data.title}
                        </h1>
                        
                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{data.users.username}</span>
                            </div>
                            {data.created_at && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(data.created_at)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                            {data.content}
                        </p>

                        {data.images && (
                            <div className="mt-4">
                                <img 
                                    src={data.images} 
                                    alt="Post attachment" 
                                    className="w-full h-auto rounded-lg border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    {isAuthor && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <EditButton slug={data.slug} />
                            <DeleteButton postId={data.id} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SinglePost;