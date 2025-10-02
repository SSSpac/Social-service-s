import SignUpForm from "./SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div className="border-1 rounded-xl p-4 w-[700px] mx-auto">
        <h2 className="font-bold text-2xl m-1">Sign Up!</h2>
        <SignUpForm/>
        <div>If you have an account, you can log in <Link className="text-red-500" href="/auth/login">log in here</Link>.</div>
        
     
        </div>
        )}
    
    export default SignUpPage;