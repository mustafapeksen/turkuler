import React from "react";

function Footer() {
    const year = new Date().getFullYear();
    return <>
        <footer>Mustafa Pekşen © {year}</footer>
    </>
}

export default Footer;