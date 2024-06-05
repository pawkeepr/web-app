import { Form, Formik } from 'formik'
import { HiHome } from 'react-icons/hi'
import { BtnPrimary } from '~/Components/atoms/btn'
import BtnFloating from '~/Components/molecules/btn-floating'
import FieldTextArea from '~/Components/molecules/field-text-area'
import { successToast } from '~/store/helpers/toast'
import { useCreateFeedbackMutation } from '~/store/hooks/feedback'
;('/api-user/update-feedback-user/{user_type}')

type FormFeedback = {
    comments: string
}

const Feedback = () => {
    const { mutateAsync } = useCreateFeedbackMutation()

    return (
        <section className="p-2 mt-2 bg-white card card-body">
            <Formik
                initialValues={{ comments: '' }}
                onSubmit={(values: FormFeedback) => {
                    mutateAsync(values)
                    successToast(
                        'Muito Obrigado! Agradecemos seu tempo e sua mensagem!',
                    )
                }}
            >
                {({ values, handleSubmit, isSubmitting }) => (
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-end "
                    >
                        <FieldTextArea
                            ctx={values}
                            label="Feedback"
                            name="comments"
                            placeholder="Deixe seu feedback... ele é de suma importância para que possamos melhorar e atender as suas necessidades e não se esqueça beba água, seu pet quer um dono hidratado e feliz!"
                            divClassName="mb-2"
                        />
                        <BtnPrimary
                            type="submit"
                            label="Enviar"
                            isLoading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
            <BtnFloating onClick={() => {}} title="Ir para a Home" icon={HiHome} />
        </section>
    )
}

export default Feedback
