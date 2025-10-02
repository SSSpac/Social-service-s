import LogInForm from "./LogInForm"
import Link from "next/link"
const LogInPage = () => {
    return (
        <div className="border-1 rounded-xl p-4 w-[700px] mx-auto">
        <h2 className="font-bold text-2xl m-1">Log in!</h2>
        <LogInForm/>
        <div>If you don't have an account, you can <Link className="text-red-500" href="/auth/signup">register here</Link>.</div>
     
        </div>
    )
}
    export default LogInPage;