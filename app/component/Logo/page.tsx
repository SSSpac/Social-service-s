import Link from "next/link"
import Image from "next/image"

const Logo = () => {
    return (
        <Link href="/" className=" flex items-center justify-start rounded text-xl italic font-bold"> SECTOR
            <Image 
                src="/space.jpg" 
                alt=" Logo"
                width={110}
                height={20} 
                priority 
            />
        </Link>
    )
}

export default Logo