
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
//Import images

import cn from "classnames";
import { useState } from "react";

import StepAddress from "../organisms/steps/step-address";
import StepAnamnese from "../organisms/steps/step-anamnese";
import StepPayment from "../organisms/steps/step-payment";
import StepPet from "../organisms/steps/step-pet";
import StepTreatment from "../organisms/steps/step-treatment";
import StepTutor from '../organisms/steps/step-tutor';

type Tabs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

type TabItem = {
    id: Tabs;
    title: string;
    href: string;
    Component: (props: any) => JSX.Element;
}

const VerticalTabs = () => {

    const [activeVerticalTab, setActiveVerticalTab] = useState(1);
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1]);

    const items: TabItem[] = [
        {
            id: 1,
            title: "Pet",
            href: "#Pet",
            Component: StepPet
        },
        {
            id: 2,
            title: "Anamnese",
            href: "#Anamnese",
            Component: StepAnamnese
        },
        {
            id: 3,
            title: "Tratamento",
            href: "#Treatment",
            Component: StepTreatment
        },
        {
            id: 4,
            title: "Tutor",
            href: "#Tutor",
            Component: StepTutor
        },
        {
            id: 5,
            title: "Endereço",
            href: "#Address",
            Component: StepAddress
        },
        {
            id: 6,
            title: "Pagamento",
            href: "#Payment",
            Component: StepPayment
        },
        {
            id: 7,
            title: "Finalizar",
            href: "#Finish",
            Component: () => (
                <div className="text-center pt-4 pb-2">
                    <div className="mb-4">

                    </div>
                    <h5>Your Order is Completed !</h5>
                    <p className="text-muted">
                        You Will receive an order confirmation email
                        with details of your order.
                    </p>
                </div>
            )
        },

    ]

    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            var modifiedSteps = [...passedVerticalSteps, tab];

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab);
                setPassedVerticalSteps(modifiedSteps);
            }
        }
    }



    return (
        <Row>
            <Col xl={12}>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-0">Nova Consulta</h4>
                    </CardHeader>
                    <CardBody className="form-steps">
                        <form className="vertical-navs-step">
                            <Row className="gy-5">
                                <Col lg={3}>
                                    <Nav
                                        className="flex-column custom-nav nav-pills"
                                    >
                                        {
                                            items.map((item, index) => {
                                                return (
                                                    <NavItem key={index}>
                                                        <NavLink
                                                            href={item.href}
                                                            className={
                                                                (cn({
                                                                    active: activeVerticalTab === item.id,
                                                                    done: (activeVerticalTab <= items.length && activeVerticalTab > item.id)
                                                                }))
                                                            }
                                                            onClick={() => {
                                                                toggleVerticalTab(item.id);
                                                            }}
                                                        >
                                                            <span className="step-title me-2">
                                                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                                                Passo {item.id}
                                                            </span>
                                                            {item.title}
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                            })
                                        }


                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <div className="px-lg-4">
                                        <TabContent activeTab={activeVerticalTab}>

                                            {
                                                items.map(({ id, Component }, index) => {
                                                    return (
                                                        <TabPane tabId={id} key={index}>
                                                            <Component activeTab={activeVerticalTab} toggleTab={toggleVerticalTab} />
                                                        </TabPane>
                                                    )
                                                })
                                            }
                                        </TabContent>
                                    </div>
                                </Col>


                            </Row>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default VerticalTabs