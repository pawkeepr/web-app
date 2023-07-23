import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldControl from '~/Components/molecules/field-control/field-control'
import { Pet } from '~/store/pets/types'
import { InitialValues } from '../../../modal-list-pets'
import { useFormikContext } from 'formik'
import { MapOptionSpecies, Species } from '~/store/pets/speciesType'
import FieldDocument from '~/Components/molecules/field-document'

type SpetDocumentProps = {
    pets: Pet[]
    handleNavigate: (pet: Pet) => void
    handleCancel: () => void
    onChangeSelectedTab: (index: number) => void
    selectedTab: number
}

enum EmojiPet {
    cat = '🐱',
    dog = '🐶',
    rabbit = '🐰',
    fish = '🐠',
    bird = '🐦',
    reptile = '🦎',
    horse = '🐴',
}

const StepDocument = ({
    pets,
    handleNavigate,
    handleCancel,
    onChangeSelectedTab,
    selectedTab
}: SpetDocumentProps) => {

    const { values } = useFormikContext<InitialValues>()

    const nextStep = () => {
        onChangeSelectedTab(selectedTab + 1)
    }



    return (
        <div className="mt-3 p-1 gap-2">
          
            <FieldDocument
                name="document"
                className="form-control w-full flex-1 mt-2"
                placeholder="CPF/CNPJ"
            />

            <BoxButtons
                isValid={values.name.length > 0}
                link={false}
                labelSuccess="Prosseguir"
                onClickCancel={handleCancel}
                onClickSuccess={nextStep}
            />

        </div>
    )
}

export default StepDocument