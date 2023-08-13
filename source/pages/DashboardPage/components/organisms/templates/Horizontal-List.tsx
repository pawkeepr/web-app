
import {
    Card,
    CardBody,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row
} from "reactstrap";
// import axios from 'axios';

// async function fetchDataFromAPI() {
//     try {
//       const response = await axios.get('https://api-appointment/fetch-all-appointment-vet');
//       const data = response.data;
//       console.log('DADOS', data); 
//     } catch (error) {
//       console.error('Ocorreu um erro na requisição:', error);
//     }
//   }

//   fetchDataFromAPI();

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
    const [maxItemsToShow, setMaxItemsToShow] = useState(2); // Define o número de itens a serem mostrados na versão mobile
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
            setMaxItemsToShow(2);
        }
        return () => {
            setIsFixed(false);
            setMaxItemsToShow(items.length);
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
                                            items.slice(0, maxItemsToShow).map((item, index) => {
                                                return (
                                                    <NavItem key={index}>
                                                        <NavLink
                                                            href={item.href}
                                                            id="steparrow-gen-info-tab"
                                                            className={
                                                                (cn({
                                                                    active: activeHorizontalTab === item.id,
                                                                    done: (activeHorizontalTab <= items.length && activeHorizontalTab > item.id)
                                                                }))
                                                            }
                                                            onClick={() => {
                                                                toggleHorizontalTab(item.id);
                                                            }}
                                                        >
                                                            {item.title}
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                            })
                                        }
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