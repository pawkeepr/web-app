import Link from 'next/link';

import {
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown
} from 'reactstrap';
import MyImage from '~/Components/atoms/my-image/my-image';


type CardVeterinaryAppointmentsProps = {
    veterinaryAppointments: any
}

const CardVeterinaryAppointments = ({ veterinaryAppointments }: CardVeterinaryAppointmentsProps) => {

    if (!veterinaryAppointments) {
        return null;
    }

    return (
        <Card className="team-box">
            <CardBody className="px-4">
                <Row className="align-items-center team-row">
                    <div className="col team-settings">
                        <Row className="align-items-center">
                            <UncontrolledDropdown className="w-full text-end">
                                <DropdownToggle tag="a" role="button">
                                    <i className="ri-more-fill fs-17"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>Ver</DropdownItem></li>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Row>
                    </div>
                    <Col lg={4}>
                        <div className="team-profile-img">
                            <div className="avatar-md w-24 h-24">
                                <div className="avatar-title bg-white rounded-circle relative">
                                    <MyImage
                                        src={veterinaryAppointments?.pet.avatar as any}
                                        alt={`Foto de Perfil de ${veterinaryAppointments?.pet.name}`}
                                        className="img-fluid d-block rounded-circle"
                                        fill
                                    />
                                </div>
                            </div>
                            <div className="team-content">
                                <Link href="#" className="d-block"><h5 className="fs-16 mb-1">{veterinaryAppointments?.pet.name}</h5></Link>
                                <p className="text-muted mb-0">
                                    <strong>Tutor: </strong>
                                    {veterinaryAppointments?.tutor.name}
                                </p>
                                <p className="text-muted mb-0">{veterinaryAppointments?.tutor.phone}</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Row className="text-center">
                            <Col xs={6} className="border-end border-end-dashed gap-1">
                                <p className="font-bold font-sans uppercase mb-2">Doenças:</p>
                                {
                                    veterinaryAppointments?.diseases?.map((disease, index) => {
                                        return (
                                            <h5 key={index} className="mb-0 ">{disease.name}</h5>
                                        )
                                    })
                                }

                            </Col>
                            <Col xs={6}>
                                <p className="font-bold font-sans uppercase mb-2">Tratamento:</p>

                                {
                                    veterinaryAppointments?.treatments.map((treatment, index) => {
                                        return (
                                            <h5 key={index} className="mb-0">{treatment.medicine}</h5>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col lg={2} className="col">
                        <div className="text-end">
                            <Link href="/pages-profile" className="btn btn-light view-btn">Ver Perfil</Link>
                        </div>
                    </Col> */}

                </Row>
            </CardBody>
        </Card>
    )
}

export default CardVeterinaryAppointments