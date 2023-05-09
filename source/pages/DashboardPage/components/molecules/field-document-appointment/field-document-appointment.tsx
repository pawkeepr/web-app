import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import FieldDocument from '~/Components/molecules/field-document/field-document';
import routes from '~/routes';

import { PlusCircleIcon } from '@heroicons/react/24/outline';

type InitialValues = {
    document: string
}

const FieldDocumentAppointment = () => {
    const router = useRouter()

    const initialValues: InitialValues = { document: '' }

    const onSubmit = (values: InitialValues) => {
        router.push(`${routes.dashboard.new.appointments}?document=${values.document}`)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            <Form className="flex flex-row items-center justify-center">
                <FieldDocument name='document' className="form-control" placeholder='Nova Consulta' label="CPF" onlyCPF >
                    <button data-bs-target="#addVeterinaryAppointmentModal" type="submit">
                        <PlusCircleIcon className="h-6 w-6 self-center m-2" />
                    </button>
                </FieldDocument>
            </Form>
        </Formik>
    )
}

export default FieldDocumentAppointment;