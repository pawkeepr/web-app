import { Formik } from 'formik'
import { useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import { BtnPrimary, BtnSecondary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import { useModeEditablePet } from '~/pages/Modules/shared/ProfilePetPage/components/hooks/use-mode-editable-pet'
import type { IProfile } from '~/types/profile'
import AddressTutor from '../../address-tutor'

type PersonalDataProps = {
    data: IProfile
}

const PersonalData = ({ data }: PersonalDataProps) => {
    const { mode } = useModeEditablePet()

    const values = {} as IProfile
    const handleSubmit = useCallback((values: IProfile) => {}, [])

    return (
        <Formik initialValues={data} onSubmit={handleSubmit}>
            <Form>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2">
                        <FieldControl
                            mode={mode}
                            label="Nome"
                            type="text"
                            ctx={values}
                            name="user_information.first_name"
                            placeholder="Digite seu nome"
                        />
                        <FieldControl
                            mode={mode}
                            label="Sobrenome"
                            type="text"
                            ctx={values}
                            name="user_information.last_name"
                            placeholder="Digite seu sobrenome"
                        />
                        <FieldControl
                            mode={mode}
                            label="Telefone"
                            type="text"
                            ctx={values}
                            name="user_information.contact.phone"
                            placeholder="Digite seu telefone"
                        />
                        <FieldControl
                            mode={mode}
                            ctx={values}
                            label="Email"
                            name="user_information.contact.email"
                            type="email"
                            placeholder="Digite seu email"
                        />
                        <AddressTutor mode={mode} />
                    </div>
                    <div className="hstack gap-2 justify-content-end">
                        <div className="flex justify-end items-end">
                            <BtnSecondary className="mr-2" label="Cancelar" />
                            <BtnPrimary className="" label="Salvar" type="submit" />
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default PersonalData
