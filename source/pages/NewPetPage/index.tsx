import { Formik } from 'formik';
import DashboardLayouts from '../_layouts/dashboard/dashboard';
import Tabs from './components/templates/vertical-tabs';

export type InitialValues = IPet;

const NewPetPage = () => {

    const handleSubmit = (values: InitialValues) => {
        console.log(values)
    }

    return (
        <DashboardLayouts title="Novo Pet" >
            <Formik
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={{}}
            >
                <Tabs />

            </Formik>
        </DashboardLayouts>
    )
}

export default NewPetPage