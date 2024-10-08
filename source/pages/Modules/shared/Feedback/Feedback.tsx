import { Form, Formik, type FormikHelpers } from 'formik'
import { HiHome } from 'react-icons/hi'
import { BtnPrimary } from '~/Components/atoms/btn'
import { BtnLinkFloating } from '~/Components/molecules/btn-floating'
import FieldTextArea from '~/Components/molecules/field-text-area'
import { useCreateFeedbackMutation } from '~/store/hooks/feedback'
;('/api-user/update-feedback-user/{user_type}')

type FormFeedback = {
    comments: string
}

const Feedback = () => {
    const { mutateAsync } = useCreateFeedbackMutation()

    const handleSubmit = async (
        values: FormFeedback,
        { resetForm }: FormikHelpers<FormFeedback>,
    ) => {
        try {
            await mutateAsync(values)
            resetForm()
        } catch (_) {}
    }

    return (
        <section className="p-2 mt-2 bg-white card card-body">
            <Formik
                initialValues={{ comments: '' }}
                enableReinitialize
                onSubmit={handleSubmit}
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
                            placeholder="Deixe seu feedback... ele é de suma importância para que possamos melhorar e atender as suas necessidades!"
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
            <BtnLinkFloating
                href="/dashboard"
                title="Ir para a Home"
                icon={HiHome}
            />
        </section>
    )
}

export default Feedback
