'use client'
import {LogIn} from "../../../../actions/log-in"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/app/component/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {
    const {register, handleSubmit,
        formState:{errors}} = useForm({
        resolver: zodResolver(logInSchema)

    })

    const {mutate,isPending, error} = useMutation({
        mutationFn: LogIn
    })
    return (
        <>
        <form onSubmit={handleSubmit(values => mutate(values))} className="mb-4 p-4 flex flex-col ">
        <fieldset>
            <label htmlFor="email">Enter Your Email</label>
            <input className="ml-2 mb-4 px-2" {...register("email")}id="email" placeholder="Your email..." />
            {errors.email && <ErrorMessage message={errors.email.message!}/>}
        </fieldset>

        <fieldset>
            <label htmlFor="password">Enter Your Password</label>
            <input type="password" className="ml-2 mb-4 px-2" {...register("password")}id="password"  placeholder="Your password..." />
                        {errors.password && <ErrorMessage message={errors.password.message!}/>}

        </fieldset>
        <button className="w-1/2 m-auto button-secondary">{isPending? "Logging in .." : "Log "}</button>


        </form>
        {error && <ErrorMessage message = {error.message}/>}

        </>

    )
}

export default LogInForm;