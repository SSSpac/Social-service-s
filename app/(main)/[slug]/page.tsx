import { createClient } from "../../../app/utils/supabase/server-client"
import {getSinglePost} from "../../../app/utils/supabase/queries"
import DeleteButton from "./Deletebutton"

 const SinglePost = async ({params}: {params: {slug: string}}) => {
    const {slug} = await params ;
    const {data} = await getSinglePost(slug)
    
    const supabase = await createClient()
    const {data : {user} }  = await supabase.auth.getUser()
    const isAuthor = user?.id === data?.user_id ? true : false

    

    return (
        <div>
            
            {data &&  
            <> 
            <div className="w-2xl m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                <h2 className="font-bold text-xl">{data.title}</h2>
                <p className="mt-4"> Made by: {data.users?.username}</p>
                <p>{data.user_id}</p>
            </div>
               <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                    {data.content && <div>{data.content}</div>}
                </div>
            
            

                    {isAuthor &&
                    <div className="w-2xl p-4 m-auto border-gray-700 mt-4 rounded-2xl"> 
                <DeleteButton postId= {data.id} />
                    </div>
 }
            
                </>
}
        </div>
    )

}
export default SinglePost;