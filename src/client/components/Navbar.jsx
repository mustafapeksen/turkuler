import React, { useState, useEffect } from 'react';

function Navbar() {
    const [stickyClass, setStickyClass] = useState('');

    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => setCurrentPage(window.location.pathname);
        window.addEventListener('popstate', handleLocationChange);
        const stickNavbar = () => {
            if (window !== undefined) {
                let windowHeight = window.scrollY;
                windowHeight > 100 ? setStickyClass('sticky-nav') : setStickyClass('');
            }
        }
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    return (
        <nav>
            <ul id="navbar" className={stickyClass}>
                <li className={currentPage === '/' ? 'current_page' : ''}>
                    <a href="/">Ana Sayfa</a>
                </li>
                <li className={currentPage === '/singer' ? 'current_page' : ''}>
                    <a href="/singer">Şarkıcı</a>
                </li>
                <li className={currentPage === '/song' ? 'current_page' : ''}>
                    <a href="/song">Şarkı</a>
                </li>
                <li className={currentPage === '/stories' ? 'current_page' : ''}>
                    <a href="/stories">Hikayeler</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
