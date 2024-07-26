import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {

    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* Outlet'e isAdmin bilgisini geçiyoruz */}
            </main>
            <Footer />
        </>
    );
}

export default App;
