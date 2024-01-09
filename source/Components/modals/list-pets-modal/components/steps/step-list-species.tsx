import { useFormikContext } from 'formik';
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons';
import { Species, species } from '~/store/slices/pets/speciesType';
import { InitialValues, StepProps } from '../../types';
import { option } from '../helpers';

enum EmojiPet {
    Gato = '🐱',
    Cachorro = '🐶',
    Coelho = '🐰',
    Peixe = '🐠',
    Pássaro = '🐦',
    Réptil = '🦎',
    Cavalo = '🐴',
}

type Key = keyof typeof EmojiPet;

const StepListSpecies = ({ nextStep, previousStep }: StepProps) => {
    const { setFieldValue, values } = useFormikContext<InitialValues>();

    const handleSelectedSpecie = (specie: Species) => {
        setFieldValue('specie', specie);
        nextStep();
    };

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 h-[calc(100vh-20rem)] overflow-auto">
                {species.map((specie) => (
                    <button
                        key={specie.value}
                        type="button"
                        onClick={() =>
                            handleSelectedSpecie(specie.value as Species)
                        }
                        className={option({
                            selected: values.specie === specie.value,
                        })}
                    >
                        <div className="flex justify-around gap-2 items-center w-40 ">
                            <span className="align-middle col-span-1">
                                {EmojiPet[specie.name as Key]}
                            </span>
                            <span className="align-middle col-span-2">
                                {specie.name}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            <BoxButtons
                isValid={!!values.specie}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />
        </div>
    );
};

export default StepListSpecies;
