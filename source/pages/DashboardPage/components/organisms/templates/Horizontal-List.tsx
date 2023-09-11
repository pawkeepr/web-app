
import {
    Card,
    CardBody,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row
} from "reactstrap";

import cn from "classnames";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "~/store/hooks";
import StepScheduledAll from "../steps/step-scheduled-all";
import StepScheduledCanceled from "../steps/step-scheduled-canceled";
import StepScheduledConfirmed from "../steps/step-scheduled-confirmed";
import StepScheduledDone from "../steps/step-scheduled-done";

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
        title: "Consultas Confirmadas",
        href: "#Confirmed",
        Component: StepScheduledConfirmed
    },
    {
        id: 2,
        title: "Consultas Agendadas",
        href: "#All",
        Component: StepScheduledAll
    },
    {
        id: 3,
        title: "Consultas Finalizadas",
        href: "#Done",
        Component: StepScheduledDone
    },
    {
        id: 4,
        title: "Consultas Canceladas",
        href: "#Canceled",
        Component: StepScheduledCanceled
    },
]

const HorizontalTabs = () => {

    const [isFixed, setIsFixed] = useState(false);
    const [activeHorizontalTab, setActiveHorizontalTab] = useState(2);
    const [passedHorizontalSteps, setPassedHorizontalSteps] = useState([1, 2]);
    const dispatch = useAppDispatch();

    const { height } = useAppSelector(state => state.Layout.headerSize)

    function toggleHorizontalTab(tab: Tabs) {
        if (activeHorizontalTab !== tab) {
            var modifiedSteps = [...passedHorizontalSteps, tab];

            if (tab >= 1 && tab <= items.length) {
                setActiveHorizontalTab(tab);
                setPassedHorizontalSteps(modifiedSteps);
            }
        }
    }

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsFixed(window.innerWidth < 768)

        }
        return () => {
            setIsFixed(false);

        };
    }, []);

    return (
        <Row>
            <Col xl={12}>
                <Card>
                    <CardBody className="form-steps">
                        <form>
                            <div className="flex flex-col relative">
                                <div
                                    className={cn(
                                        ' step-arrow-nav',
                                        {
                                            ' bg-white': isFixed,
                                        },
                                        'md:static'
                                    )}>
                                    <Nav
                                        className="nav-pills custom-nav nav-justified"
                                        role="tablist"
                                    >
                                        <NavItem key={1}>
                                            <NavLink
                                                href="#Confirmed"
                                                id="steparrow-gen-info-tab"
                                                className={
                                                    (cn({
                                                        active: activeHorizontalTab === 1,
                                                        done: (activeHorizontalTab <= items.length && activeHorizontalTab === 1)
                                                    }))
                                                }
                                                onClick={() => {
                                                    toggleHorizontalTab(1);
                                                }}
                                            >
                                                Consultas Confirmadas
                                            </NavLink>
                                        </NavItem>
                                        <NavItem key={2}>
                                            <NavLink
                                                href="#All"
                                                id="steparrow-gen-info-tab"
                                                className={
                                                    (cn({
                                                        active: activeHorizontalTab === 2,
                                                        done: (activeHorizontalTab <= items.length && activeHorizontalTab === 2)
                                                    }))
                                                }
                                                onClick={() => {
                                                    toggleHorizontalTab(2);
                                                }}
                                            >
                                                Consultas Agendadas
                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="mobile:hidden" key={3}>
                                            <NavLink
                                                href="#Canceled"
                                                id="steparrow-gen-info-tab"
                                                className={
                                                    (cn({
                                                        active: activeHorizontalTab === 3,
                                                        done: (activeHorizontalTab <= items.length && activeHorizontalTab === 3)
                                                    }))
                                                }
                                                onClick={() => {
                                                    toggleHorizontalTab(3);
                                                }}
                                            >
                                                Consultas Canceladas
                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="mobile:hidden" key={4}>
                                            <NavLink
                                                href="#Done"
                                                id="steparrow-gen-info-tab"
                                                className={
                                                    (cn({
                                                        active: activeHorizontalTab === 4,
                                                        done: (activeHorizontalTab <= items.length && activeHorizontalTab === 4)
                                                    }))
                                                }
                                                onClick={() => {
                                                    toggleHorizontalTab(4);
                                                }}
                                            >
                                                Consultas Finalizadas
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default HorizontalTabs