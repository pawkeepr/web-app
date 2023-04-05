import DashboardLayouts from "../_layouts/dashboard";

import Container from "react-bootstrap/Container";

import VerticalTabs from "./components/templates/vertical-tabs";


const AppointmentsPage = () => {


    return (
        <DashboardLayouts title="Nova Consulta">
            <Container>
                <VerticalTabs />
            </Container>
        </DashboardLayouts>
    )
}

export default AppointmentsPage