import { Formik } from "formik"
import FieldControl from "~/Components/molecules/field-control/field-control"
import RadioGroup from "~/Components/molecules/radio-group/radio-group"
import { species, SpeciesType } from "~/store/pets/speciesType"

type InitialValues = {
    name: string
    species: SpeciesType
}

const initialValues: InitialValues = {
    name: '',
    species: '' as any,
}

const MiniBoxPet = () => {

    const handleSubmit = (values: InitialValues) => {
        console.log(values)
    }

    return (
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit} >
            <div className="w-full flex flex-col flex-shrink">
                <FieldControl name="name" className="form-control w-full flex-1" placeholder="Nome do Pet" />
                <RadioGroup name="species" items={species} className="gap-1 flex justify-center items-center" />
            </div>
        </Formik>
    )
}

export default MiniBoxPet