import { useState, useTransition } from 'react'
import SwitchControl from '~/Components/atoms/switch-control'
import FieldTextArea from '~/Components/molecules/field-text-area/field-text-area'
import type { ExamsTypes } from '~/constants'

export type ItemExam = {
    type: ExamsTypes
    value: number | string
    label: string
    type_action: null | 'collect' | 'perform' | 'request'
    checked: boolean
}

type ContentActionExamProps = {
    option: ItemExam
    name: string
    label: string
}

const TypeAction = {
    collect: 'collect',
    perform: 'perform',
    request: 'request',
} as const
type TypeAction = (typeof TypeAction)[keyof typeof TypeAction]

const ContentActionExam = ({ option, name, label }: ContentActionExamProps) => {
    const [type, setType] = useState<TypeAction | null>(option?.type_action)
    const [loading, startTransition] = useTransition()

    const onChangeTypeAction = (type: TypeAction) => {
        startTransition(() => setType(type))
    }

    return (
        <section className="p-4">
            {String(option?.checked)} {option && JSON.stringify(option)}
            <div className="flex gap-1 font-sans text-xs text-gray-500 uppercase">
                <SwitchControl
                    condition={!loading}
                    name={name as ''}
                    disabled={!option?.checked}
                    checked={type === TypeAction.collect}
                    onChange={() => onChangeTypeAction(TypeAction.collect)}
                >
                    Coletar
                </SwitchControl>
                <SwitchControl
                    condition={!loading}
                    name={name as ''}
                    disabled={!option?.checked}
                    checked={type === TypeAction.perform}
                    onChange={() => onChangeTypeAction(TypeAction.perform)}
                >
                    Realizar
                </SwitchControl>
                <SwitchControl
                    condition={!loading}
                    name={name as ''}
                    disabled={!option?.checked}
                    checked={type === TypeAction.request}
                    onChange={() => onChangeTypeAction(TypeAction.request)}
                >
                    Solicitar
                </SwitchControl>
                {loading && <div className="w-10 h-10 " />}
            </div>
            <FieldTextArea
                label={label}
                name={name as ''}
                disabled={!option?.checked}
            />
        </section>
    )
}

export default ContentActionExam
