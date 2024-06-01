import { tv } from 'tailwind-variants'
import { SpeciesType, species } from '~/types/speciesType'

enum EmojiPet {
    cat = '🐱',
    dog = '🐶',
    rabbit = '🐰',
    fish = '🐠',
    bird = '🐦',
    reptile = '🦎',
    horse = '🐴',
}

export const option = tv({
    base: `
        group w-full flex items-center justify-center
        rounded-md px-2 py-4 text-sm gap-2
        hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
        !h-12
        active:bg-primary-500 dark:active:!bg-primary-500 active:text-white
    `,
    variants: {
        selected: {
            true: 'bg-secondary-500 dark:!bg-secondary-600 text-gray-600',
            false: 'text-gray-600',
        },
    },
})

export type Option = SpeciesType

export type MedicalRecordFormProps = {
    onChange: (type: Option) => void
}

const OptionsSpecies = ({ onChange }: MedicalRecordFormProps) => {
    return (
        <div className="grid grid-cols-2 mobile:grid-cols-1">
            {species?.map((item, index) => (
                <button
                    key={`${item.value}-${index}`}
                    type="button"
                    onClick={onChange.bind(null, item)}
                    className={option()}
                >
                    <div className="flex justify-center flex-1 gap-2">
                        <div className="flex flex-row items-center justify-center gap-2 w-60">
                            <span className="items-center justify-center flex-1">
                                {EmojiPet[item.value as keyof typeof EmojiPet]}
                            </span>
                            <span className=" flex-[2] items-center justify-center">
                                {item.label}
                            </span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default OptionsSpecies
