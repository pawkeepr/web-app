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

import { sample } from 'lodash';

import { Tutor } from '~/store/tutor/types';

type CardTutorsProps = {
    tutor: Tutor
}

const CardTutors = ({ tutor }: CardTutorsProps) => {

    if (!tutor) {
        return null;
    }

    return (
        <Card className="team-box">
            <CardBody className="px-4">
                <Row className="align-items-center team-row">
                    <div className="col team-settings">
                        <Row className="align-items-center">
                            <div className="col">
                                <div className="flex-shrink-0 me-2">
                                    <button type="button" className="btn fs-16 p-0 favourite-btn">
                                        <i className="ri-star-fill"></i>
                                    </button>
                                </div>
                            </div>
                            <UncontrolledDropdown className="col text-end">
                                <DropdownToggle tag="a" role="button">
                                    <i className="ri-more-fill fs-17"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>Ver</DropdownItem></li>
                                    <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favoritar</DropdownItem></li>
                                    <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Deletar</DropdownItem></li>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Row>
                    </div>
                    <Col lg={4}>
                        <div className="team-profile-img">
                            <div className="avatar-lg img-thumbnail rounded-circle">
                                <MyImage
                                    src={tutor?.avatar}
                                    alt={`Foto de Perfil de ${tutor?.name}`}
                                    className="img-fluid d-block rounded-circle"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="team-content">
                                <Link href="#" className="d-block"><h5 className="fs-16 mb-1">{tutor?.name}</h5></Link>
                                <p className="text-muted mb-0">{tutor?.phone}</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Row className="text-muted text-center">
                            <Col xs={6} className="border-end border-end-dashed">
                                <h5 className="mb-1">{
                                    sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
                                }</h5>
                                <p className="text-muted mb-0">Consultas</p>
                            </Col>
                            <Col xs={6}>
                                <i className="emoji" data-emoji="🐱"></i>
                                <i className="emoji" data-emoji="🐶"></i>
                                <i className="emoji" data-emoji="🐰"></i>
                                <i className="emoji" data-emoji="🐹"></i>
                                <i className="emoji" data-emoji="🐠"></i>
                                <p className="text-muted mb-0">Pets</p>
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

export default CardTutors