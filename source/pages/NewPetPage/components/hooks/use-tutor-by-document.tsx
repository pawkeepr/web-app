import { useEffect, useState, useTransition } from "react"
import { useAppSelector } from "~/store/hooks"
import { Data as Pet } from "~/store/pets/types"

type UseTutorByDocumentProps = {
    document: string
    onChangeField: (field: string, value: any) => void
}

const useTutorByDocument = ({ document, onChangeField }: UseTutorByDocumentProps) => {

    const [isPending, startTransition] = useTransition()
    const [tutorExists, setTutorExists] = useState(false)
    const [petsOptions, setPetsOptions] = useState<(Pet & { value: string })[]>([])

    const { pets, tutors } = useAppSelector(state => ({
        pets: state.Pets.data,
        tutors: state.Tutor.data
    })
    )

    useEffect(() => {
        const documentNumber = document?.replace(/\D/g, '')

        if (!documentNumber || documentNumber.length < 11) {
            return
        }

        const tutor = tutors.find(tutor => tutor.document === documentNumber)

        if (!tutor) {
            setTutorExists(false)
            return
        }

        const petsOptions = pets
            .filter(pet => pet?.ownerEmergencyContact.document === documentNumber)
            .map(pet => ({
                ...pet,
                value: pet.id,
            }))

        startTransition(() => {
            setTutorExists(true)
            setPetsOptions(petsOptions)
            onChangeField('tutor.id', tutor?.id || '')
            onChangeField('tutor.phone', tutor?.phone || '')
            onChangeField('tutor.name', tutor?.name || '')
            onChangeField('tutor.email', tutor?.email || '')
            onChangeField('tutor.avatar', tutor?.avatar || '')
            tutor?.address && onChangeField('tutor.address', tutor?.address)
        })

    }, [document, tutors, pets, onChangeField])

    return {
        isPending,
        tutorExists,
        petsOptions
    }
}

export default useTutorByDocument