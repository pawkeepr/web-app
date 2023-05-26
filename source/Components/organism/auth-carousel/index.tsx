import Link from "next/link";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

// Import Images
import Image from "next/image";
import logoLight from "~/assets/images/logo-light.png";

type AuthSliderProps = {
    bg?: 'auth-bg-image' | 'auth-bg-image-2' | 'auth-bg-image-3';
    classNames?: string;
};

const AuthSlider = ({ bg = 'auth-bg-image', classNames }: AuthSliderProps) => {
    return (
        <React.Fragment>

            <Col lg={6}>
                <div className={`p-4 auth-one-bg ${bg} ${classNames} h-100`}>
                    <div className="bg-overlay"></div>
                    <div className="position-relative h-100 d-flex flex-column">
                        <div className="mb-4">
                            <Link href="/dashboard" className="d-block">
                                <Image src={logoLight} alt="" height="60" />
                            </Link>
                        </div>
                        <div className="mt-auto">
                            <div className="mb-3">
                                <i className="ri-double-quotes-l display-4 text-success"></i>
                            </div>

                            <Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false} infiniteLoop={true} className="carousel slide" id="qoutescarouselIndicators" >
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">
                                            {"Fique despreocupado, cuidamos do seu animalzinho por você!"}
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" The theme is really great with an amazing customer support."</p>
                                    </div>
                                </div> */}
                            </Carousel>

                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment>
    );
};

export default AuthSlider;