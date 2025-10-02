import Header from "../component/Header";
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