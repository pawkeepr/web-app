import type { Breed } from '~/types/breedType'
import type { GenericSelect, On_Off, PetData } from '~/types/pet-v2'
import type { Gender, Species } from '~/types/speciesType'

export class PetInformation implements PetData {
    id_pet: string
    name_pet: string
    microchip: string | null
    identification_number: string | null
    specie: Species | null
    race: Breed | null
    castrated: On_Off | null
    blood_type: string | null
    approximate_date: boolean
    blood_donator: On_Off | null
    sex: Gender | null
    organ_donor: On_Off | null
    date_birth: string | null
    color: string | null
    size: string | null
    weight: string | null
    pedigree: On_Off | null
    pedigree_registry: string | null

    constructor() {
        this.id_pet = ''
        this.name_pet = ''
        this.microchip = ''
        this.identification_number = ''
        this.specie = null
        this.blood_donator = 'no'
        this.blood_type = ''
        this.castrated = 'no'
        this.approximate_date = false
        this.color = ''
        this.date_birth = ''
        this.organ_donor = 'no'
        this.pedigree = 'no'
        this.pedigree_registry = ''
        this.size = ''
        this.race = null
        this.sex = null
        this.weight = ''
    }

    defineName(name: string): PetInformation {
        this.name_pet = name
        return this
    }

    defineMicrochip(microchip: string): PetInformation {
        this.microchip = microchip
        return this
    }

    defineIdentificationNumber(identificationNumber: string): PetInformation {
        this.identification_number = identificationNumber
        return this
    }

    defineApproximateDate(approximateDate = false): PetInformation {
        this.approximate_date = approximateDate
        return this
    }

    defineSpecie(specie: Species | GenericSelect): PetInformation {
        this.specie =
            typeof specie === 'string' ? specie : (specie.value as Species)
        return this
    }

    defineBloodDonator(bloodDonator: On_Off | boolean): PetInformation {
        if (typeof bloodDonator === 'boolean') {
            this.blood_donator = bloodDonator ? 'yes' : 'no'
            return this
        }
        this.blood_donator = bloodDonator
        return this
    }

    defineBloodType(bloodType: string | GenericSelect): PetInformation {
        this.blood_type =
            typeof bloodType === 'string' ? bloodType : (bloodType.value as string)
        return this
    }

    defineCastrated(castrated: On_Off | boolean): PetInformation {
        if (typeof castrated === 'boolean') {
            this.castrated = castrated ? 'yes' : 'no'
            return this
        }
        this.castrated = castrated
        return this
    }

    defineColor(color: string): PetInformation {
        this.color = color
        return this
    }

    defineDateBirth(dateBirth: string): PetInformation {
        this.date_birth = dateBirth
        return this
    }

    defineOrganDonor(organDonor: On_Off | boolean): PetInformation {
        if (typeof organDonor === 'boolean') {
            this.organ_donor = organDonor ? 'yes' : 'no'
            return this
        }
        this.organ_donor = organDonor
        return this
    }

    definePedigree(pedigree: On_Off | boolean): PetInformation {
        if (typeof pedigree === 'boolean') {
            this.pedigree = pedigree ? 'yes' : 'no'
            return this
        }
        this.pedigree = pedigree
        return this
    }

    definePedigreeRegistry(pedigreeRegistry: string): PetInformation {
        this.pedigree_registry = pedigreeRegistry
        return this
    }

    defineSize(size: string): PetInformation {
        this.size = size
        return this
    }

    defineRace(race: Breed | GenericSelect) {
        this.race = typeof race === 'string' ? race : (race.value as Breed)
        return this
    }

    defineSex(sex: Gender | GenericSelect) {
        this.sex = typeof sex === 'string' ? sex : (sex.value as Gender)
        return this
    }

    defineWeight(weight: string): PetInformation {
        this.weight = weight
        return this
    }

    defineIdPet(idPet: string): PetInformation {
        this.id_pet = idPet
        return this
    }

    static build(params: PetData): PetInformation {
        return new PetInformation()
            .defineIdPet(params.id_pet || '')
            .defineBloodDonator(params.blood_donator || 'no')
            .defineBloodType(params.blood_type || 'unknown')
            .defineCastrated(params.castrated || 'no')
            .defineColor(params.color || 'unknown')
            .defineDateBirth(params.date_birth || '2021-01-01')
            .defineIdentificationNumber(params.identification_number || '')
            .defineMicrochip(params.microchip || '')
            .defineName(params.name_pet)
            .defineOrganDonor(params.organ_donor || 'no')
            .definePedigree(params.pedigree || 'no')
            .defineApproximateDate(params.approximate_date || false)
            .definePedigreeRegistry(params.pedigree_registry || '')
            .defineSize(params.size || 'unknown')
            .defineSpecie(params.specie || 'unknown')
            .defineRace(params.race || 'unknown')
            .defineSex(params.sex || 'unknown')
            .defineWeight(params.weight || 'unknown')
    }
}
