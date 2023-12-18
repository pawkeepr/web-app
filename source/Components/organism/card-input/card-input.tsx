import { Form, Formik } from "formik"
import { useMemo } from "react"
import * as Yup from 'yup'
import { BtnConfirm } from "~/Components/atoms/btn"
import FieldControl from "~/Components/molecules/field-control"
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select"
import FieldTextArea from "~/Components/molecules/field-text-area"

type Option = {
    value: string
    label: string
}

type InitialValues = {
    type: Option
    name: string
    notes: string
}

type CardInputProps = {
    items?: Option[]
    handleSubmit?: (data: InitialValues, formikHelpers: any) => Promise<any>
}

const validationSchema = Yup.object({
    type: Yup.object().shape({
        value: Yup.string().required('Campo obrigatório'),
        label: Yup.string().required('Campo obrigatório')
    }),
    name: Yup.string().required('Campo obrigatório'),
    notes: Yup.string()
})


const makeOptions = (items: Option[]) => {
    return items.map((item) => ({
        value: item.value,
        label: item.label,
        color: 'rgb(255 200 107);',
    }));
}

const CardInput = ({
    items = [],
    handleSubmit = async () => { console.log('handleSubmit') }

}: CardInputProps) => {
    const options = useMemo(() => makeOptions(items), [items])

    return (
        <Formik
            initialValues={{
                type: {
                    value: '',
                    label: 'Escolha uma opção'
                },
                name: '',
                notes: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {
                ({ isValid, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="gap-2 flex flex-col card shadow-2xl p-8" >
                        <FieldControlSelect
                            name="type"
                            required
                            label="Tipo"
                            options={options}
                        />
                        <FieldControl name="name" label="Nome" required />
                        <FieldTextArea
                            name="notes"
                            label='Observações'
                        />

                        <BtnConfirm
                            disabled={!isValid}
                            className="w-full text-white"
                            label="Adicionar"
                            type="submit"
                        />
                    </Form>
                )
            }

        </Formik>
    )
}

export default CardInput