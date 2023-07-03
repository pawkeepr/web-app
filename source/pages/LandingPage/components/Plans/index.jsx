import Link from 'next/link';
import { useState } from 'react';
import Pulse from 'react-reveal/Pulse';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const Plans = () => {
    const [plan, setPlan] = useState(true);
    const toggle = () => setPlan(!plan);
    return (
        <>
            <section className="section bg-light" id="plans">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-semibold text-lg md:text-3xl">
                                    Escolha o plano ideal para você
                                </h3>
                                <p className="text-muted mb-4 text-sm md:text-lg">
                                    Preços simples. Sem taxas escondidas. Sempre pensando em você e no seu Pet.
                                </p>

                                <div className="d-flex justify-content-center align-items-center">
                                    <div>
                                        <h5 className="text-base font-medium mb-0">Mês</h5>
                                    </div>
                                    <div className="form-check form-switch fs-20 ms-3 " onClick={toggle} >
                                        <input className="form-check-input" type="checkbox" id="plan-switch" />
                                        <label className="form-check-label" htmlFor="plan-switch"></label>
                                    </div>
                                    <div>
                                        <h5 className="text-base font-medium mb-0">Ano<span className="badge badge-soft-success ml-1">Save 20%</span></h5>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="gy-4">
                        <Col lg={4}>
                            <Card className="plan-box mb-0 ">
                                <CardBody className="p-4 m-2 text-base md:text-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h5 className="mb-1 fw-semibold">Free</h5>
                                            <p className="text-muted mb-0">Experimente Agora!</p>
                                        </div>
                                        <div className="avatar-sm">
                                            <div className="avatar-title bg-light rounded-circle text-primary">
                                                <i className="ri-book-mark-line fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 text-center">
                                        {plan ? <h1 className="month"><sup><small>R$</small></sup><span className="ff-secondary fw-bold">0,00</span> <span
                                            className="fs-13 text-muted">/Mês</span></h1> :
                                            <h1 className="annual"><sup><small>$</small></sup><span className="ff-secondary fw-bold">171</span> <span
                                                className="fs-13 text-muted">/Ano</span></h1>}
                                    </div>

                                    <div>
                                        <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                            <li>
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 text-success me-1">
                                                        <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        Consultas <b>10</b> por mês
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                        <div className="mt-4">
                                            <Link href="#" className="btn btn-soft-success w-100">Testar</Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* <!--end col--> */}
                        <Col lg={4}>
                            <Pulse>
                                <Card className="plan-box mb-0 ribbon-box right bg-primary !text-white">
                                    <CardBody className="p-4 m-2 h-42 text-base md:text-lg">
                                        <div className="ribbon-two ribbon-two-danger "><span>Popular</span></div>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1">
                                                <h5 className="mb-1 fw-semibold !text-white">Básico</h5>
                                                <p className="text-muted mb-0"></p>
                                            </div>
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light rounded-circle text-primary">
                                                    <i className="ri-medal-fill fs-20"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-4 text-center">
                                            {plan ? <h1 className="month !text-white"><sup><small>R$</small></sup><span className="ff-secondary fw-bold">49,90</span> <span
                                                className="fs-13 text-muted !text-white">/Mês</span></h1> :
                                                <h1 className="annual !text-white"><sup><small>R$</small></sup><span className="ff-secondary fw-bold">479,00</span> <span
                                                    className="fs-13 text-muted !text-white">/Ano</span></h1>}
                                        </div>

                                        <div>
                                            <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 text-success me-1">
                                                            <i className="ri-checkbox-circle-fill fs-15 align-middle text-white"></i>
                                                        </div>
                                                        <div className="flex-grow-1 !text-white">
                                                            Consultas <b>50</b> Mensais
                                                        </div>
                                                    </div>
                                                </li>

                                            </ul>
                                            <div className="mt-4">
                                                <Link href="#" className="btn btn-secondary w-100 text-black font-bold">Adquirir Agora</Link>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Pulse>
                        </Col>

                        <Col lg={4}>
                            <Card className="plan-box mb-0">
                                <CardBody className="p-4 m-2 text-base md:text-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h5 className="mb-1 fw-semibold">Prêmio</h5>
                                            <p className="text-muted mb-0"></p>
                                        </div>
                                        <div className="avatar-sm">
                                            <div className="avatar-title bg-light rounded-circle text-primary">
                                                <i className="ri-stack-fill fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 text-center">
                                        {plan ? <h1 className="month"><sup><small>R$</small></sup><span className="ff-secondary fw-bold">149,90</span> <span
                                            className="fs-13 text-muted">/Mês</span></h1> :
                                            <h1 className="annual"><sup><small>R$</small></sup><span className="ff-secondary fw-bold">1439,00</span> <span
                                                className="fs-13 text-muted">/Ano</span></h1>}
                                    </div>

                                    <div>
                                        <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                            <li>
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 text-success me-1">
                                                        <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <b>100</b> Consultas
                                                    </div>
                                                </div>
                                            </li>


                                        </ul>
                                        <div className="mt-4">
                                            <Link href="#" className="btn btn-soft-success w-100">Adquirir</Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                    <div className="d-flex mt-4">
                        <div className="flex-grow-1 text-center italic text-base font-medium">
                            Para mais de 100 consultas, fale com nossos atendentes!
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Plans;