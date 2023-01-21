import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


// Import Images
import imgPattern from "~/assets/images/landing/img-pattern.png";

import Image from 'next/image';
import creativeDemo from "~/assets/images/demos/creative.png";
import defaultDemo from "~/assets/images/demos/default.png";
import interactiveDemo from "~/assets/images/demos/interactive.png";
import materialDemo from "~/assets/images/demos/material.png";
import minimalDemo from "~/assets/images/demos/minimal.png";
import modernDemo from "~/assets/images/demos/modern.png";
import saasDemo from "~/assets/images/demos/saas.png";


const Home = () => {
    return (
        <React.Fragment>
            <section className="section pb-0 hero-section bg-primary" id="hero">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} sm={10}>
                            <div className="text-center mt-lg-5 pt-5">
                                <h3 className="display-10 fw-bold mb-3 lh-base">A melhor maneira de gerenciar sua Clinica Veterinária</h3>
                                <h1 className="display-6 fw-bold mb-3 lh-base text-secondary">PawKeepr</h1>
                                <h2 className="display-6 fw-bold mb-3 lh-base">Com PawKeepr você resolve
                                    todas as necessidades do seu pet:
                                    da higiene até a alimentação.</h2>

                                <div className="d-flex gap-2 justify-content-center mt-4">
                                    <Link href="/sign-in" className="btn btn-primary">Entrar <i className="ri-arrow-right-line align-middle ms-1"></i></Link>
                                    <Link href="/pages-pricing" className="btn btn-danger">Ver Planos <i className="ri-eye-line align-middle ms-1"></i></Link>
                                </div>
                            </div>

                            <div className='mt-4 mt-sm-5 pt-sm-5 mb-sm-n5 demo-carousel'>
                                <div className="demo-img-patten-top d-none d-sm-block">
                                    <Image src={imgPattern} className="d-block img-fluid" alt="..." />
                                </div>
                                <div className="demo-img-patten-bottom d-none d-sm-block">
                                    <Image src={imgPattern} className="d-block img-fluid" alt="..." />
                                </div>
                                <Swiper
                                    spaceBetween={30}
                                    effect={"fade"}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    modules={[EffectFade, Autoplay]}
                                    className="mySwiper" >

                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={defaultDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={saasDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={materialDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={minimalDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={creativeDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={modernDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                    <SwiperSlide className="carousel-inner shadow-lg p-2 bg-white rounded">
                                        <Image src={interactiveDemo} className="d-block w-100" alt="..." />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <div className="position-absolute start-0 end-0 bottom-0 hero-shape-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1440 120">
                        <g mask="url(&quot;#SvgjsMask1003&quot;)" fill="none">
                            <path d="M 0,118 C 288,98.6 1152,40.4 1440,21L1440 140L0 140z">
                            </path>
                        </g>
                    </svg>
                </div>

            </section>
        </React.Fragment>
    );
};

export default Home;