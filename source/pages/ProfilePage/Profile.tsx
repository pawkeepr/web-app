import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap'

import CardContainer from './components/CardContainer'
import CoverImage from './components/CoverImage'
import FormChangePass from './components/Forms/ChangePass'
import FormPersonalData from './components/Forms/PersonalData'
import FormProfissionalExperiencie from './components/Forms/ProfessionalExperience'

import { useAppSelector } from '~/store/hooks'

//import images
import avatar1 from '~/assets/images/users/avatar-1.jpg'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('1')
    const profile = useAppSelector((state) => state.Profile.user)

    const tabChange = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <CoverImage />

                    <Row>
                        <Col xxl={3}>
                            <CardContainer className="mt-n5">
                                <div className="p-4">
                                    <div className="text-center">
                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                            <Image
                                                src={avatar1}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile"
                                            />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <Input
                                                    id="profile-img-file-input"
                                                    type="file"
                                                    className="profile-img-file-input"
                                                />
                                                <Label
                                                    htmlFor="profile-img-file-input"
                                                    className="profile-photo-edit avatar-xs"
                                                >
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill" />
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                        <h5 className="mb-1">Anna Adame</h5>
                                        <p className="text-muted mb-0">
                                            Lead Designer / Developer
                                        </p>
                                    </div>
                                </div>
                            </CardContainer>

                            <CardContainer>
                                <div className="mb-3 d-flex">
                                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                                        <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                            <i className="ri-github-fill" />
                                        </span>
                                    </div>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        id="gitUsername"
                                        placeholder="Username"
                                        defaultValue="@daveadame"
                                    />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                                        <span className="avatar-title rounded-circle fs-16 bg-primary">
                                            <i className="ri-global-fill" />
                                        </span>
                                    </div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="websiteInput"
                                        placeholder="www.example.com"
                                        defaultValue="www.velzon.com"
                                    />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                                        <span className="avatar-title rounded-circle fs-16 bg-success">
                                            <i className="ri-dribbble-fill" />
                                        </span>
                                    </div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="dribbleName"
                                        placeholder="Username"
                                        defaultValue="@dave_adame"
                                    />
                                </div>
                                <div className="d-flex">
                                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                                        <span className="avatar-title rounded-circle fs-16 bg-danger">
                                            <i className="ri-pinterest-fill" />
                                        </span>
                                    </div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="pinterestName"
                                        placeholder="Username"
                                        defaultValue="Advance Dave"
                                    />
                                </div>
                            </CardContainer>
                        </Col>

                        <Col xxl={9}>
                            <Card className="mt-xxl-n5">
                                <CardHeader>
                                    <Nav
                                        className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: activeTab === '1',
                                                })}
                                                onClick={() => {
                                                    tabChange('1')
                                                }}
                                            >
                                                <i className="fas fa-home" />
                                                Informações Pessoais
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === '2',
                                                })}
                                                onClick={() => {
                                                    tabChange('2')
                                                }}
                                                type="button"
                                            >
                                                <i className="far fa-user" />
                                                Alterar Senha
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === '3',
                                                })}
                                                onClick={() => {
                                                    tabChange('3')
                                                }}
                                                type="button"
                                            >
                                                <i className="far fa-envelope" />
                                                Experiências e Especializações
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === '4',
                                                })}
                                                onClick={() => {
                                                    tabChange('4')
                                                }}
                                                type="button"
                                            >
                                                <i className="far fa-envelope" />
                                                Configurações
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <FormPersonalData />
                                        </TabPane>

                                        <TabPane tabId="2">
                                            <FormChangePass />
                                        </TabPane>

                                        <TabPane tabId="3">
                                            <FormProfissionalExperiencie />
                                        </TabPane>

                                        <TabPane tabId="4">
                                            {/* <div className="mb-4 pb-2">
                                                <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-15 mb-1">Two-factor Authentication</h6>
                                                        <p className="text-muted">Two-factor authentication is an enhanced
                                                            security meansur. Once enabled, you'll be required to give
                                                            two types of identification when you log into Google
                                                            Authentication and SMS are Supported.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link href="#"
                                                            className="btn btn-sm btn-primary">Enable Two-facor
                                                            Authentication</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-15 mb-1">Secondary Verification</h6>
                                                        <p className="text-muted">The first factor is a password and the
                                                            second commonly includes a text with a code sent to your
                                                            smartphone, or biometrics using your fingerprint, face, or
                                                            retina.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link href="#" className="btn btn-sm btn-primary">Set
                                                            up secondary method</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-15 mb-1">Backup Codes</h6>
                                                        <p className="text-muted mb-sm-0">A backup code is automatically
                                                            generated for you when you turn on two-factor authentication
                                                            through your iOS or Android Twitter app. You can also
                                                            generate a backup code on twitter.com.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link href="#"
                                                            className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="mb-3">
                                                <h5 className="card-title text-decoration-underline mb-3">
                                                    Application Notifications:
                                                </h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <label
                                                                htmlFor="directMessage"
                                                                className="form-check-label fs-15"
                                                            >
                                                                Direct messages
                                                            </label>
                                                            <p className="text-muted">
                                                                Messages from people
                                                                you follow
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="directMessage"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label
                                                                className="form-check-label fs-15"
                                                                htmlFor="desktopNotification"
                                                            >
                                                                Show desktop
                                                                notifications
                                                            </Label>
                                                            <p className="text-muted">
                                                                Choose the option
                                                                you want as your
                                                                default setting.
                                                                Block a site: Next
                                                                to Not allowed to
                                                                send notifications,
                                                                click Add.
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="desktopNotification"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label
                                                                className="form-check-label fs-15"
                                                                htmlFor="emailNotification"
                                                            >
                                                                Show email
                                                                notifications
                                                            </Label>
                                                            <p className="text-muted">
                                                                {' '}
                                                                Under Settings,
                                                                choose
                                                                Notifications. Under
                                                                Select an account,
                                                                choose the account
                                                                to enable
                                                                notifications for.{' '}
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="emailNotification"
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label
                                                                className="form-check-label fs-15"
                                                                htmlFor="chatNotification"
                                                            >
                                                                Show chat
                                                                notifications
                                                            </Label>
                                                            <p className="text-muted">
                                                                To prevent duplicate
                                                                mobile notifications
                                                                from the Gmail and
                                                                Chat apps, in
                                                                settings, turn off
                                                                Chat notifications.
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="chatNotification"
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label
                                                                className="form-check-label fs-15"
                                                                htmlFor="purchaesNotification"
                                                            >
                                                                Show purchase
                                                                notifications
                                                            </Label>
                                                            <p className="text-muted">
                                                                Get real-time
                                                                purchase alerts to
                                                                protect yourself
                                                                from fraudulent
                                                                charges.
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="purchaesNotification"
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="card-title text-decoration-underline mb-3">
                                                    Delete This Account:
                                                </h5>
                                                <p className="text-muted">
                                                    Go to the Data & Privacy section
                                                    of your profile Account. Scroll
                                                    to "Your data & privacy
                                                    options." Delete your Profile
                                                    Account. Follow the instructions
                                                    to delete your account :
                                                </p>
                                                <div>
                                                    <Input
                                                        type="password"
                                                        className="form-control"
                                                        id="passwordInput"
                                                        placeholder="Enter your password"
                                                        defaultValue="make@321654987"
                                                        style={{
                                                            maxWidth: '265px',
                                                        }}
                                                    />
                                                </div>
                                                <div className="hstack gap-2 mt-3">
                                                    {/* <Link href="#" className="btn btn-soft-danger">Close &
                                                        Delete This Account</Link> */}
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light"
                                                    >
                                                        Salvar
                                                    </Link>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Profile
