'use client'

import {LogOut} from "../../../../actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }
    return (
        <button onClick={handleClick} className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50  gap-3 ml-auto pr-5"> LogOut</button>
    )
}
export default LogOutButton