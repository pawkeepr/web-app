'use client'

import React, { useEffect } from 'react';
import CTA from './CTA';
import Connect from './Connect';
import Home from "./Home";
import Products from "./Products";
import FAQ from "./faq";
import Features from './features';
import Footer from "./footer";
import Navbar from "./navbar";
import Teams from "./team";

const HomePage = () => {

    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, []);

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <React.Fragment>
            <div className="layout-wrapper landing">
                <Navbar />
                <Home />
                <Connect />
                <Products />
                <Features />
                <CTA />
                <Teams />
                <FAQ />
                <Footer />
                <button onClick={() => toTop()} className="btn btn-danger btn-icon landing-back-top" id="back-to-top">
                    <i className="ri-arrow-up-line"></i>
                </button>
            </div>
        </React.Fragment>
    );
};

export default HomePage;