import { XMarkIcon } from '@heroicons/react/24/solid'
import { tv } from 'tailwind-variants'
import withControl from '~/Components/helpers/with-control'

type TagProps = {
    name: string
    disabled?: boolean
    selected: boolean
    onClick?: () => void
    children: React.ReactNode
}

const tag = {
    button: tv({
        base: 'px-2 py-1 border rounded transition-colors flex items-center gap-1 ',
        variants: {
            selected: {
                true: 'bg-primary-500 text-white',
                false: 'bg-secondary-200 text-black',
            },
            disabled: {
                true: 'opacity-50 cursor-not-allowed',
            },
        },
    }),
    label: tv({
        base: 'text-sm font-semibold border-l border-secondary-200 pl-2 cursor-pointer',
        variants: {
            selected: {
                true: 'text-gray-50',
                false: 'text-gray-500',
            },
        },
    }),
    icon: tv({
        base: 'absolute left-1 text-xm ',
        variants: {
            selected: {
                true: 'text-gray-100',
                false: 'text-gray-500',
            },
        },
    }),
}

const Tag: React.FC<TagProps> = ({
    name,
    disabled,
    selected,
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            name={name}
            disabled={disabled}
            className={tag.button({
                className: 'rounded-full border px-4 pl-2 relative',
                selected,
                disabled,
            })}
            onClick={onClick}
        >
            {selected && (
                <div
                    className={tag.icon({
                        selected,
                    })}
                >
                    <XMarkIcon className="w-4 h-4" />
                </div>
            )}
            <label
                className={tag.label({
                    selected,
                })}
            >
                {children}
            </label>{' '}
        </button>
    )
}

export default withControl(Tag)
