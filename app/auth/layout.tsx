import Logo from "../../app/component/Logo/index";
const AuthLayout = ({children,
}: {children: React.ReactNode
}) => {
    return (
        <div>
            <header className="flex justify-between items-center flex-wrap">
                <Logo/>
            </header>
            {children}
        </div>
    )
}

export default AuthLayout;