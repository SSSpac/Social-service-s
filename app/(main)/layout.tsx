import Header from "../component/Header/index";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
           <Header />
            {children}
        </>
    )
}

export default MainLayout;