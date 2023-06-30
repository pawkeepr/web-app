// Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";
import Slide from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";

import landingPage03 from "~/assets/images/bg-three.webp";
import landingPage01 from "~/assets/images/landing-page-01.jpg";
import landingPage02 from "~/assets/images/landing-page-02.jpg";

// Import Images

import Image from "next/image";

const Home = () => {
    return (
        <>
            <section className="section hero-section bg-primary" id="hero">
                <div className="bg-overlay bg-overlay-pattern"></div>

                <div className="grid grid-cols-1 items-swiper-centered mt-5 md:mt-0 md:grid-cols-2 p-4">
                    <Slide left>
                        <div className="col-span-1">
                            {/* <div className="demo-img-patten-top d-none d-sm-block">
                                    <Image src={imgPattern} className="d-block img-fluid" alt="..." />
                                </div>
                                <div className="demo-img-patten-bottom d-none d-sm-block">
                                    <Image src={imgPattern} className="d-block img-fluid" alt="..." />
                                </div> */}

                            <Image
                                src={landingPage01}
                                className="w-100"
                                alt="..."
                            />
                            {/* <Swiper
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
                            
                        </SwiperSlide>

                    </Swiper> */}
                        </div>
                    </Slide>
                    <Zoom>
                        <div className="text-center mt-lg-5 pt-5 col-span-1">
                            <p className="text-lg lg:text-2xl font-semibold font-sans p-4 text-white">
                                {`
                            Imagine realizar uma consulta completa em no máximo 5 minutos, 
                            sem sacrificar a qualidade do atendimento. 
                            Com nosso aplicativo inovador, você terá acesso a recursos poderosos 
                            na palma da sua mão.
                           `}
                            </p>

                            {/* <div className="d-flex gap-2 justify-content-center mt-4">
                                    <Link href="/sign-in" className="btn btn-primary">Entrar <i className="ri-arrow-right-line align-middle ms-1"></i></Link>
                                    <Link href="/pages-pricing" className="btn btn-danger">Ver Planos <i className="ri-eye-line align-middle ms-1"></i></Link>
                                </div> */}
                        </div>
                    </Zoom>
                </div>
            </section>

            <section className="section pb-0 hero-section bg-white" id="hero2">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <div className="grid grid-cols-1 place-items-center md:mt-0 md:grid-cols-2 p-4">
                    <Zoom>
                        <div className="flex items-center text-center col-span-1">
                            <p className="text-lg lg:text-2xl font-semibold font-sans p-4">
                                {`Desperte a revolução veterinária em suas mãos!
                            Tenha todos os registros de seus pacientes ao alcance das suas mãos, 
                            de forma prática, simples e rápida. Do registro inicial até o histórico 
                            médico completo, todas as informações estarão disponíveis de forma instantânea.`}
                            </p>
                        </div>
                    </Zoom>
                    <Slide right>
                        <div className="col-span-1">
                            <Image
                                src={landingPage02}
                                className="w-100 h-[90%] !border-none rounded-3xl"
                                alt="..."
                            />
                        </div>
                    </Slide>
                </div>
            </section>
            <section
                className="section pb-0 hero-section bg-primary"
                id="hero3"
            >
                <div className="bg-overlay bg-overlay-pattern"></div>
                <div className="grid grid-cols-1 mt-5 md:mt-0 md:grid-cols-2 p-4">
                    <Slide left>
                        <div className="col-span-1">
                            <Image
                                src={landingPage03}
                                className="w-100 !border-none"
                                alt="..."
                            />
                        </div>
                    </Slide>
                    <Zoom>
                        <div className="text-center mt-lg-5 pt-5 col-span-1">
                            <p className="text-lg lg:text-2xl font-semibold font-sans p-4 text-white">
                                {`Isso significa que você terá mais tempo para se concentrar no que realmente importa: 
                            oferecer um cuidado excepcional aos animais.`}
                            </p>

                            <p className="text-lg lg:text-xl font-semibold font-sans p-4 text-white">
                                Por apenas
                                <span className="italic text-base font-bold">
                                    {" "}
                                    R$ 0,99{" "}
                                </span>
                                por consulta
                            </p>
                        </div>
                    </Zoom>
                </div>
            </section>
        </>
    );
};

export default Home;
