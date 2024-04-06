import CardTutors from '~/Components/organism/card-tutors'

import useListTutors from '~/store/hooks/list-tutors-by-clinic/use-list-tutors'

const TutorsTab = () => {
    const { data: tutors } = useListTutors()

    return (
        <section className="w-full px-4 mobile:!px-2 web:mt-2">
            {tutors?.map((tutor) => (
                <CardTutors key={tutor.cpf_cnpj} tutor={tutor} />
            ))}
        </section>
    )
}

export default TutorsTab
