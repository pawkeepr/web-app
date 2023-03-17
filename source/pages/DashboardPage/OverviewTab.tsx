import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const OverviewTab = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={9} lg={8}>
                    <Card className="p-4">
                        <div className="text-muted">
                            <h6 className="mb-3 fw-bold text-uppercase">Summary</h6>
                            <p>It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>

                            <ul className="ps-4 vstack gap-2">
                                <li>Product Design, Figma (Software), Prototype</li>
                                <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                                <li>Create calendar, chat and email app pages.</li>
                                <li>Add authentication pages.</li>
                                <li>Content listing.</li>
                            </ul>

                            <div>
                                <button type="button" className="btn btn-link link-success p-0">Read more</button>
                            </div>

                            {/* <div className="pt-3 border-top border-top-dashed mt-4">
                                    <Row>

                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Create Date :</p>
                                                <h5 className="fs-15 mb-0">15 Sep, 2021</h5>
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Due Date :</p>
                                                <h5 className="fs-15 mb-0">29 Dec, 2021</h5>
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Priority :</p>
                                                <div className="badge bg-danger fs-12">High</div>
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium fs-14">Status :</p>
                                                <div className="badge bg-warning fs-12">Inprogess</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div> */}


                        </div>
                    </Card>
                </Col>

                <Col xl={3} lg={4}>
                    <Card className='p-4'>
                        <h5 className="card-title mb-4">Skills</h5>
                        <div className="d-flex flex-wrap gap-2 fs-16">
                            <div className="badge fw-medium badge-soft-secondary">UI/UX</div>
                            <div className="badge fw-medium badge-soft-secondary">Figma</div>
                            <div className="badge fw-medium badge-soft-secondary">HTML</div>
                            <div className="badge fw-medium badge-soft-secondary">CSS</div>
                            <div className="badge fw-medium badge-soft-secondary">Javascript</div>
                            <div className="badge fw-medium badge-soft-secondary">C#</div>
                            <div className="badge fw-medium badge-soft-secondary">Nodejs</div>
                        </div>
                    </Card>

                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OverviewTab;