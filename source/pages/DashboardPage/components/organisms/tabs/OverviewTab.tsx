import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAppSelector } from '~/store/hooks';

const OverviewTab = () => {

    const profile = useAppSelector(state => state.Profile.user)

    return (
        <React.Fragment>
            <Row>
                <Col xl={9} lg={8}>
                    <Card className="p-4">
                        <div className="text-muted">
                            <h6 className="mb-3 fw-bold text-uppercase">Sobre</h6>
                            <p>{profile?.about || ""}</p>
                        </div>
                    </Card>
                </Col>

                <Col xl={3} lg={4}>
                    <Card className='p-4'>
                        <h5 className="card-title mb-4">Skills</h5>
                        <div className="d-flex flex-wrap gap-2 fs-16">
                            <div className="badge fw-medium badge-soft-secondary">Felinos</div>
                            <div className="badge fw-medium badge-soft-secondary">Caninos</div>
                            <div className="badge fw-medium badge-soft-secondary">Silvestres</div>
                        </div>
                    </Card>

                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OverviewTab;