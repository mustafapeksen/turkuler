import React, { useState, useEffect } from 'react';

function Navbar() {
    // State to manage the 'sticky' class for the navbar when scrolling
    const [stickyClass, setStickyClass] = useState('');

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    // useEffect hook to add event listeners for scrolling and location changes
    useEffect(() => {
        // Function to update the current page when the location changes
        const handleLocationChange = () => setCurrentPage(window.location.pathname);
        window.addEventListener('popstate', handleLocationChange); // Listen for history changes

        // Function to add or remove the 'sticky' class based on scroll position
        const stickNavbar = () => {
            if (window !== undefined) {
                let windowHeight = window.scrollY;
                windowHeight > 100 ? setStickyClass('sticky-nav') : setStickyClass('');
            }
        };
        window.addEventListener('scroll', stickNavbar); // Listen for scroll events

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    return (
        <nav>
            <ul id="navbar" className={stickyClass}>
                {/* Navbar links with conditional class for the current page */}
                <li className={currentPage === '/' ? 'current_page' : ''}>
                    <a href="/">Ana Sayfa</a>
                </li>
                <li className={currentPage === '/singer' ? 'current_page' : ''}>
                    <a href="/singer">Sanatçılar</a>
                </li>
                <li className={currentPage === '/songs' ? 'current_page' : ''}>
                    <a href="/songs">Şarkılar</a>
                </li>
                <li className={currentPage === '/stories' ? 'current_page' : ''}>
                    <a href="/stories">Hikayeler</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
