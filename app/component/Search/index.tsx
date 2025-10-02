'use client'
import {SetStateAction, use, useState} from "react"
import { useQuery } from "@tanstack/react-query";
import { getSearchedPosts } from "../../utils/supabase/queries";
import Link from "next/link";
import { Search } from "lucide-react";

const SearchInput = () => {
    const [userInput, setUserInput] = useState<string>('')

    const {data} = useQuery({
        queryKey:['search-results', userInput],
        queryFn: async ({ signal }) => {
            const {data,error} = await getSearchedPosts(userInput)
            if(error) throw new Error
            return data
        }, 
        enabled: userInput && userInput.length > 0 ? true : false
    })


    const handleChange = (e:{target: {value: SetStateAction<string>}}) => {
        setUserInput(e.target.value)
    }
    return (

        <div className="relative">
    <div className="flex items-center gap-2">
        <Search size={32} />
        <input onChange={handleChange} className="border-1 rounded-xl p-2" name="search" placeholder="Search..." value={userInput} />
    </div>
    {data && 
        <div onClick={() => setUserInput('')} className="border absolute bg-white p-2 rounded-xl">
            {data.map(({ title, slug }) => 
                <Link className="block" href={`/${slug}`}>
                    {title}
                </Link>
            )}
        </div>

            }
        </div>
    )}


export default SearchInput;