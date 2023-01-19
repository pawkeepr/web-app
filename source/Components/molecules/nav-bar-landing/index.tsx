'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ScrollSpy from "react-scrollspy";
import { Collapse, Container, NavbarToggler } from "reactstrap";

// Import Images
import logoLight from "~/assets/images/logo-dark.png";
import logoDark from "~/assets/images/logo-light.png";


const NavbarLanding = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [navClass, setNavClass] = useState("");

    const toggle = () => setIsOpenMenu(!isOpenMenu);

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    const scrollNavigation = () => {
        var scrollUp = document.documentElement.scrollTop;
        if (scrollUp > 50) {
            setNavClass("is-sticky");
        } else {
            setNavClass("");
        }
    }

    return (
        <React.Fragment>
            <nav className={"navbar navbar-expand-lg navbar-landing fixed-top" + navClass} id="navbar">
                <Container>
                    <Link className="navbar-brand" href="/index">
                        <Image src={logoLight} className="card-logo card-logo-light" alt="logo light" height="40" />
                        <Image src={logoDark} className="card-logo card-logo-dark" alt="logo dark" height="40" />
                    </Link>

                    <NavbarToggler className="navbar-toggler py-0 fs-20 text-body" onClick={toggle} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className="mdi mdi-menu"></i>
                    </NavbarToggler>

                    <Collapse
                        isOpen={isOpenMenu}
                        className="navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ScrollSpy
                            offset={-18}
                            items={[
                                "hero",
                                "services",
                                "features",
                                "plans",
                                "reviews",
                                "team",
                                "contact",
                            ]}
                            currentClassName="active"
                            className="navbar-nav mx-auto mt-2 mt-lg-0"
                            id="navbar-example"
                        >
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-secondary" href="#hero">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-light" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-light" href="#features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-light" href="#plans">Plans</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-light" href="#reviews">Reviews</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-light" href="#team">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-15 fw-semibold text-light" href="#contact">Contact</a>
                            </li>
                        </ScrollSpy>

                        <div className="">
                            <Link href="/sign-in" className="btn btn-link text-dark">
                                <span className="m-1 fw-semibold">Entrar</span>
                                {/* icon de seta a direita circular na porta */}
                                <i className="mdi mdi-arrow-right-circle"></i>
                            </Link>
                            <Link href="/sign-up" className="btn btn-secondary text-dark ">
                                <span className="m-1 fw-semibold">Cadastre-se</span>
                                {/* icon de cadastro */}
                                <i className="mdi mdi-account-plus"></i>
                            </Link>
                        </div>
                    </Collapse>
                </Container>
            </nav>
        </React.Fragment>
    );
};

export default NavbarLanding;