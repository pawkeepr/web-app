/* eslint-disable @next/next/no-img-element */
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'

// Import Images

import HeaderTitle from '~/Components/atoms/header-title'

const Home = () => {
    return (
        <>
            <HeaderTitle title="Bem Vindo" />

            <section className="section hero-section bg-primary" id="hero">
                <div className="bg-overlay bg-overlay-pattern" />

                <div className="grid grid-cols-1 items-swiper-centered mt-5 md:mt-0 md:grid-cols-2 p-4">
                    <Slide left>
                        <div className="col-span-1">
                            <img
                                src="/landing-page-01.jpg"
                                className="w-100"
                                alt="..."
                            />
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
                <div className="bg-overlay bg-overlay-pattern" />
                <div className="grid grid-cols-1 place-items-center md:mt-0 md:grid-cols-2 p-4">
                    <Zoom>
                        <div className="flex items-center text-center col-span-1">
                            <p className="text-lg lg:text-2xl font-semibold font-sans p-4">
                                {
                                    'Desperte a revolução veterinária em suas mãos! Agora você pode ter acesso a todos os registros de seus pacientes de forma prática, simples e rápida. Desde o registro inicial até o histórico médico completo, todas as informações estarão ao alcance de seus dedos, de forma instantânea e conveniente. Cuide dos seus pacientes com eficiência e agilidade, proporcionando um atendimento excepcional com a tecnologia mais avançada ao seu lado!'
                                }
                            </p>
                        </div>
                    </Zoom>
                    <Slide left>
                        <div className="col-span-1">
                            <img
                                src="/landing-page-02.webp"
                                className="w-100 h-[90%] !border-none rounded-3xl"
                                alt="..."
                            />
                        </div>
                    </Slide>
                </div>
            </section>
            <section
                className="section pb-0 hero-section bg-primary-500"
                id="hero3"
            >
                <div className="bg-overlay bg-overlay-pattern" />
                <div className="grid grid-cols-1 mt-5 web:mt-0 md:grid-cols-2 p-4">
                    <Slide left>
                        <div className="col-span-1">
                            <img
                                src="/bg-three.webp"
                                className="w-full  !border-none"
                                alt="..."
                            />
                        </div>
                    </Slide>
                    <Zoom>
                        <div className="text-center pt-5 col-span-1">
                            <p className="text-lg lg:text-2xl font-semibold font-sans p-4 text-white">
                                {`Isso significa que você terá mais tempo para se concentrar no que realmente importa: 
                            oferecer um cuidado excepcional aos animais.`}
                            </p>

                            {/* <p className="text-lg lg:text-xl font-semibold font-sans p-4 text-white">
                                Por apenas
                                <span className="italic text-base font-bold">
                                    {" "}
                                    R$ 9,99{" "}
                                </span>
                                por consulta
                            </p> */}
                        </div>
                    </Zoom>
                </div>
            </section>
        </>
    )
}

export default Home
