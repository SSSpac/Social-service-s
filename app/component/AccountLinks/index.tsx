import Link from "next/link"
import { createClient } from "@/utils/supabase/server-client"
import LogOutButton from "./LogOutButton"


const AccountLinks = async () => {

   const supabase = await createClient()
   const {data: {user}, error} = await supabase.auth.getUser()

   return (
  <div>
    {user ? 
      <div className="flex gap-4"> {/* Add this wrapper with gap */}
        <Link className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50" href="/create">
          Make a post
        </Link>
        <LogOutButton />
      </div>
      : 
      <Link className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 ml-auto" href="auth/login">
        Log In!
      </Link>
    }
  </div>
)
}

export default AccountLinks