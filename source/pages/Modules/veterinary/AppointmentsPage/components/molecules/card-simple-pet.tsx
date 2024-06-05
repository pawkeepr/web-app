import { useMemo } from 'react'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { useTranslations } from '~/hooks/use-translations'
import type { VeterinaryConsultation } from '~/types/appointment'

const CardSimplePet = () => {
    const { values } = useFormikContextSafe<VeterinaryConsultation>()
    const { t } = useTranslations('common')
    const specie = useMemo(
        () => t(values.tutor_pet_vet?.pet?.specie),
        [values.tutor_pet_vet?.pet?.specie],
    )

    const race = useMemo(
        () => t(values.tutor_pet_vet?.pet?.race as string),
        [values.tutor_pet_vet?.pet?.race],
    )

    return (
        <p className="justify-start p-2 text-gray-500 bg-white">
            <strong className="mr-2">Pet:</strong>
            <span>{`${values.tutor_pet_vet?.pet?.name_pet}, ${specie}, ${race}`}</span>
        </p>
    )
}

export default CardSimplePet
