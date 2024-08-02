import React from "react";
import Navbar from "./Navbar";

function Header() {
    return <>
        <header>
            <img id="logo" src="/images/SeyyahlarLogo.jpg" />
            <h1>Turkuler</h1>
        </header>
        <Navbar />
    </>
}

export default Header;