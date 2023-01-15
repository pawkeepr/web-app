'use client'

import React, { useEffect } from 'react';
import NavbarLanding from '~/Components/molecules/nav-bar-landing';
import Contact from './contact';
import FAQ from "./faq";
import Footer from "./footer";
import Home from "./home";
import Plans from './plans';
import Reviews from './reviews';
import Teams from "./team";
import WorkProcess from './workProcess';


const LandingPage = () => {

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
                <NavbarLanding />
                <Home />
                <WorkProcess />
                <Plans />
                <Reviews />
                <Teams />
                <FAQ />
                <Contact />
                <Footer />
                <button onClick={() => toTop()} className="btn btn-secondary btn-icon landing-back-top" id="back-to-top">
                    <i className="ri-arrow-up-line"></i>
                </button>
            </div>
        </React.Fragment>
    );
};

export default LandingPage;