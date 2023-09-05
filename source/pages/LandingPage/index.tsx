"use client";

import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import React, { useEffect } from "react";
import NavbarLanding from "~/Components/molecules/nav-bar-landing";
import Footer from "../../Layouts/Footer";
import Home from "./home";

const LandingPage = () => {
    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, []);

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
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
                {/* <WorkProcess /> */}
                {/* <Plans /> */}
                {/* <Reviews />
                <Teams />
                <FAQ />
                <Contact /> */}
                <Footer />
            </div>
            <button
                onClick={() => toTop()}
                className="bg-secondary-500 p-3 rounded-full absolute bottom-0 right-0 mb-[5rem] shadow-md"
                id="back-to-top"
            >
                <ArrowUpIcon className="w-6 h-6" />
            </button>
        </React.Fragment>
    );
};

export default LandingPage;
