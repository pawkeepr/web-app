import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import Image from 'next/image';
import logolight from "~/assets/images/logo-light.png";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="custom-footer bg-primary py-5 position-relative">
                <Container>
                    <Row>
                        <Col lg={4} className="mt-4">
                            <div>
                                <div>
                                    <Image src={logolight} alt="logo light" height="17" />

                                </div>
                                <Col sm={4} className="mt-4">
                                    <div className="mt-3">
                                        <ul className="list-unstyled ff-secondary footer-list fs-15 !text-white ">
                                            <li><Link href="/pages-profile">Sobre a PawKeepr</Link></li>
                                            <li><Link href="/pages-gallery">Equipe</Link></li>
                                            <li><Link href="/pages-faqs">Contato</Link></li>

                                        </ul>
                                    </div>
                                </Col>

                            </div>
                        </Col>

                    </Row>

                    <Row className="text-center text-sm-start align-items-center mt-5 !text-white">
                        <Col sm={6}>

                            <div>
                                <p className="copy-rights mb-0">
                                    {new Date().getFullYear()} © PawKeepr - Todos os direitos reservados.
                                </p>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end mt-3 mt-sm-0 !text-white">
                                <ul className="list-inline mb-0 footer-social-link">
                                    <li className="list-inline-item">
                                        <Link href="#" className="avatar-xs d-block">
                                            <div className="avatar-title rounded-circle">
                                                <i className="ri-facebook-fill"></i>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="list-inline-item">
                                        <Link href="#" className="avatar-xs d-block">
                                            <div className="avatar-title rounded-circle">
                                                <i className="ri-linkedin-fill"></i>
                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment >
    );
};

export default Footer;