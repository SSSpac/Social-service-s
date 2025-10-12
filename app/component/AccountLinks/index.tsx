import Link from "next/link"
import { createClient } from "@/utils/supabase/server-client"
import LogOutButton from "./LogOutButton"


const AccountLinks = async () => {

   const supabase = await createClient()
   const {data: {user}, error} = await supabase.auth.getUser()

   return (
     <div>
    {user ? 
    <>

    <Link className="button-secondary p-3 m-3" href="/create" > Make a post</Link>
    <LogOutButton />

    </>

       : <Link className="button-secondary" href="auth/login">Log In!</Link>
    }
    </div>
   )
}

export default AccountLinks