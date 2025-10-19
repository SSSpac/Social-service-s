import Logo from "../Logo/index"
import AccountLinks from "../AccountLinks/index"
import SearchInput from "../Search"

const Header = () => { 
    return (
       <>
       <header className="flex bg-gray-700 justify-between items-center  flex-wrap">
            <Logo />
            <SearchInput />
            <AccountLinks />
        </header>
        <div className=" mt-4 mx-[90%] border-b-10 flex-8/12" ></div>
        
</>
    )
}

export default Header