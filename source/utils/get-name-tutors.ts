import type { IMainResponsibleGuardian } from '~/types/pet-v2'

export const getNameTutor = (
    tutor?: Pick<IMainResponsibleGuardian, 'name' | 'first_name' | 'last_name'>,
) => {
    if (!tutor) return ''

    const { name, first_name, last_name } = tutor
    if (name) return name
    return `${first_name} ${last_name}`
}
