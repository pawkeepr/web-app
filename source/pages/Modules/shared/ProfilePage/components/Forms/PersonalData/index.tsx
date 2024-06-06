import cn from 'classnames'
import { Formik, type FormikHelpers } from 'formik'
import { useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import { FaEdit, FaEye } from 'react-icons/fa'
import { BtnIcon, BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import { useModeEditablePet } from '~/pages/Modules/shared/MaintainPetPage/components/hooks/use-mode-editable-pet'
import { useUpdateProfileMutation } from '~/store/hooks/profile/use-profile'
import type { IProfile } from '~/types/profile'
import AddressTutor from '../../address-tutor'

type PersonalDataProps = {
    data: IProfile
}

const PersonalData = ({ data }: PersonalDataProps) => {
    const { mode, toggleMode } = useModeEditablePet()
    const { mutateAsync } = useUpdateProfileMutation()

    const handleSubmit = useCallback(
        async (values: IProfile, { setSubmitting }: FormikHelpers<IProfile>) => {
            try {
                await mutateAsync(values)
            } catch (error) {
                console.error(error)
            } finally {
                setSubmitting(false)
            }
        },
        [],
    )

    return (
        <Formik initialValues={data} onSubmit={handleSubmit}>
            {({ values, isSubmitting, handleSubmit }) => (
                <Form className="pb-4" onSubmit={handleSubmit}>
                    <div className="flex justify-end w-full">
                        <BtnIcon
                            icon={
                                mode === 'editable' ? (
                                    <span>
                                        <FaEye className="w-5 h-5" />
                                    </span>
                                ) : (
                                    <span>
                                        <FaEdit className="w-5 h-5" />
                                    </span>
                                )
                            }
                            type="button"
                            className={cn(
                                `
                                flex justify-center items-center web:!w-32 h-10 rounded-md
                            `,
                                {
                                    'bg-confirm-500 hover:bg-confirm-600 text-white':
                                        mode === 'editable',
                                    'bg-primary-500 hover:bg-primary-600 text-white':
                                        mode !== 'editable',
                                },
                            )}
                            label={mode === 'editable' ? 'Visualizar' : 'Editar'}
                            onClick={toggleMode}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 gap-2 mobile:grid-cols-1">
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
                                mode="readonly"
                                ctx={values}
                                label="Email"
                                name="user_information.contact.email"
                                type="email"
                                disabled
                                placeholder="Digite seu email"
                            />
                            <AddressTutor mode={mode} />
                        </div>
                        <div className="flex items-end justify-end mobile:justify-center">
                            <BtnNeutral
                                outline
                                label="Cancelar"
                                condition={!isSubmitting}
                                className="border-none"
                            />
                            <BtnPrimary
                                label="Salvar"
                                type="submit"
                                isLoading={isSubmitting}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default PersonalData
