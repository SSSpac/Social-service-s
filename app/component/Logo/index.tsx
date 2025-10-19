import Link from "next/link"
import Image from "next/image"

const Logo = () => {
    return (
        <Link href="/" className=" flex items-center justify-start rounded text-xl italic mr-2 gap-6 font-bold"> SECTOR
            <Image 
                src="/team_fg_img.png" 
                alt=" Logo"
                width={90}
                height={20} 
                priority 
            />
        </Link>
    )
}

export default Logo