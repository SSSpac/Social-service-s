import Logo from "../Logo/index"
import AccountLinks from "../AccountLinks/index"
import SearchInput from "../Search"

const Header = () => { 
    return (
        <>
            <header className="flex m-[-32] flex-col md:flex-row gap-4 md:gap-0 p-4 md:p-1 bg-gray-700 justify-between items-center">
                <div className="w-full md:w-auto flex justify-center md:justify-start">
                    <Logo />
                </div>
                
                <div className="w-full md:flex-1 md:max-w-2xl md:mx-8 order-last md:order-none">
                    <SearchInput />
                </div>
                
                <div className="w-full md:w-auto flex justify-center md:justify-end">
                    <AccountLinks />
                </div>
            </header>
            
            <div className=""></div>
        </>
    )
}

export default Header