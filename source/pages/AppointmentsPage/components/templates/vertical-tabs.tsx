
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
import { useEffect, useState } from "react";

import { useAppSelector } from "~/store/hooks";
import StepAnamneses from "../organisms/steps/step-anamnese";
import StepPayment from "../organisms/steps/step-payment";
import StepPet from "../organisms/steps/step-pet";
import StepTreatment from "../organisms/steps/step-treatment";

type Tabs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

type TabItem = {
    id: Tabs;
    title: string;
    href: string;
    Component: (props: any) => JSX.Element;
}

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
        Component: StepAnamneses
    },
    {
        id: 3,
        title: "Tratamento",
        href: "#Treatment",
        Component: StepTreatment
    },
    // {
    //     id: 4,
    //     title: "Tutor",
    //     href: "#Tutor",
    //     Component: StepTutor
    // },
    // {
    //     id: 5,
    //     title: "Endereço",
    //     href: "#Address",
    //     Component: StepAddress
    // },
    {
        id: 4,
        title: "Pagamento",
        href: "#Payment",
        Component: StepPayment
    },
    {
        id: 5,
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

const VerticalTabs = () => {

    const [isFixed, setIsFixed] = useState(false);
    const [activeVerticalTab, setActiveVerticalTab] = useState(1);
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1]);

    const { height } = useAppSelector(state => state.Layout.headerSize)

    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            var modifiedSteps = [...passedVerticalSteps, tab];

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab);
                setPassedVerticalSteps(modifiedSteps);
            }
        }
    }

    useEffect(() => {
        setIsFixed(window.innerWidth < 768)

        return () => {
            setIsFixed(false)
        };
    }, []);


    return (
        <Row>
            <Col xl={12}>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-0">Nova Consulta</h4>
                    </CardHeader>
                    <CardBody className="form-steps">
                        <form>
                            <div className="flex flex-col relative">
                                <div
                                    style={{ marginTop: isFixed ? `${height}px` : 0 }}
                                    className={cn(
                                        'mb-4 step-arrow-nav',
                                        {
                                            'fixed top-0 left-0 right-0 z-[100] bg-white': isFixed,
                                        },
                                        'md:static'
                                    )}>
                                    <Nav
                                        className="nav-pills custom-nav nav-justified"
                                        role="tablist"
                                    >
                                        {
                                            items.map((item, index) => {
                                                return (
                                                    <NavItem key={index}>
                                                        <NavLink
                                                            href={item.href}
                                                            id="steparrow-gen-info-tab"
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
                                                            {/* <span className="step-title me-2">
                                                                <i className="ri-close-circle-fill step-icon me-2"/>
                                                            </span> */}
                                                            {item.title}
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                            })
                                        }
                                    </Nav>
                                </div>

                                <Col lg={12}>
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
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default VerticalTabs