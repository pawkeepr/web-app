
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
import StepPet from "../organisms/steps/step-pet";
import StepVaccines from '../organisms/steps/step-vaccines';

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
            title: "Pessoa",
            href: "#Person",
            Component: StepPet
        },
        {
            id: 2,
            title: "Address",
            href: "#Address",
            Component: StepAddress
        },
        {
            id: 3,
            title: "Payment",
            href: "#Payment",
            Component: StepVaccines
        },
        {
            id: 4,
            title: "Finish",
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