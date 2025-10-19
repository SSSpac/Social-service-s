'use client'
import { Signup } from "@/actions/sign-up"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/actions/schemas"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/app/component/ErrorMessage"
const SignUpForm = () => {
    const {
        register,
    handleSubmit,
    formState: {errors}
      }  = useForm ({ 
        resolver: zodResolver(signUpSchema)

    })

   const {mutate,isPending, error} = useMutation({
          mutationFn: Signup
      })
    return (
        <>
        <form onSubmit={handleSubmit(values => mutate(values))} className="text-white mb-4 p-4 flex flex-col ">
        <fieldset>
            <label htmlFor="email">Enter Your Email</label>
            <input className="ml-2 mb-4 px-2" id="email"  {...register("email")} placeholder="Your email..." />
            {errors.email && <ErrorMessage message= {errors.email.message!} />}
        </fieldset>
<fieldset>
            <label htmlFor="password">Enter Your Password</label>
            <input type="password" className="ml-2 mb-4 px-2" id="password"  {...register("password")} placeholder="Your password..." />
                        {errors.password && <ErrorMessage message= {errors.password.message!} />}

        </fieldset>
        <fieldset>
            <label htmlFor="username">Enter Your Username</label>
            <input type="text" className="ml-2 mb-4 px-2" id="username" {...register("username")} placeholder="Your username..." />
                        {errors.username && <ErrorMessage message= {errors.username.message!} />}

        </fieldset>
        <button className="w-1/2 m-auto button-secondary"> Sign Up!</button>
                {error && <ErrorMessage message = {error.message}/>}



        </form>

        </>

    )
}

export default SignUpForm;