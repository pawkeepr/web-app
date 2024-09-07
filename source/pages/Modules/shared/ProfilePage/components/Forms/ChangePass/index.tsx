import { Form, Formik, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import { updatePassword } from '~/services/helpers/auth'

const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}
type FormValues = typeof initialValues

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Senha atual é obrigatória'),
    newPassword: Yup.string().required('Nova senha é obrigatória'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'As senhas devem coincidir')
        .required('Confirme sua nova senha'),
})

const ChangePass = () => {
    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
    ) => {
        const { oldPassword, newPassword } = values

        try {
            await updatePassword(oldPassword, newPassword)
            alert('Senha atualizada com sucesso!')
        } catch (error) {
            setFieldError('oldPassword', 'Senha atual incorreta')
        }

        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="flex justify-around w-full mobile:flex-col">
                    <div>
                        <FieldControl
                            ctx={initialValues}
                            name="oldPassword"
                            label="Senha Atual"
                            type="password"
                            className="form-control"
                            id="oldPasswordInput"
                            placeholder="Digite sua senha atual"
                        />
                    </div>

                    <div>
                        <div>
                            <FieldControl
                                ctx={initialValues}
                                name="newPassword"
                                label="Nova Senha"
                                type="password"
                                className="form-control"
                                placeholder="Digite sua nova senha"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <FieldControl
                                ctx={initialValues}
                                name="confirmPassword"
                                label="Confirmar Senha"
                                type="password"
                                className="form-control"
                                placeholder="Confirme sua nova senha"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <BtnPrimary className="" label="Salvar Senha" type="submit" />
                </div>
            </Form>
        </Formik>
    )
}

export default ChangePass
