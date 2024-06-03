import React from "react";
import Navbar from "../navBar/NavBar";

//layout component created to avoid duplication on other pages
function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}

export default Layout;