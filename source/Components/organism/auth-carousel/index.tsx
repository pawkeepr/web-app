import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

// Import Images

type AuthSliderProps = {
    bg?: 'auth-bg-image' | 'auth-bg-image-2' | 'auth-bg-image-3';
    classNames?: string;
};

const AuthSlider = ({ bg = 'auth-bg-image', classNames }: AuthSliderProps) => {
    return (
        <React.Fragment>

            <Col lg={6}>
                <div className={`p-4 auth-one-bg ${bg} ${classNames} h-100`}>
                    <div className="position-relative h-100 d-flex flex-column">
                        {/* <div className="mb-4">
                            <Link href="/dashboard" className="d-block">
                                <Image src={logoLight} alt="" height="60" />
                            </Link>
                        </div> */}
                        <div className="mt-auto w-full">


                            <Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false} infiniteLoop={true} className="carousel slide" id="qoutescarouselIndicators" >
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">

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