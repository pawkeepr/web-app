import FieldArraySafe from '~/Components/molecules/field-array-safe'
import CardInputVaccination from '~/Components/organism/card-input-vaccination'
import ListControl from '~/Components/organism/list-horizontal-switch/list'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { useTranslations } from '~/hooks/use-translations'
import type { QuestionVaccination } from '~/types/appointment'
import type { Species } from '~/types/speciesType'
import ContentActionVaccination from '../../molecules/content-action-vaccination'
import type { CtxVaccination } from '../../steps/step-vaccination/step-vaccination'
import { screen } from '../../steps/styles'

type Steps = {
    label: string
    value: Species
}
type VaccinationsOptionsProps = {
    items: QuestionVaccination[]
    steps: Steps[]
    specie: Species
}

const GenericOptions = ({ steps, items, specie }: VaccinationsOptionsProps) => {
    const { values } = useFormikContextSafe<CtxVaccination>()

    return (
        <>
            <div className={screen()}>
                <FieldArraySafe name="vaccinations" ctx={values}>
                    {({ push, remove }) => (
                        <CardInputVaccination
                            handleRemove={(index) => remove(index)}
                            handleSubmit={(data, formikHelpers) => {
                                return new Promise(() => {
                                    push(data)
                                    formikHelpers.resetForm()
                                })
                            }}
                        />
                    )}
                </FieldArraySafe>
            </div>
        </>
    )
}

const VaccinationsOptions = ({
    steps,
    items,
    specie,
}: VaccinationsOptionsProps) => {
    const { values } = useFormikContextSafe<CtxVaccination>()
    const { t } = useTranslations('common')

    if (!items?.length)
        return <GenericOptions steps={steps} items={items} specie={specie} />

    return (
        <FieldArraySafe ctx={values} name="vaccinations">
            {(arrayProps) => (
                <ListControl
                    arrayProps={arrayProps}
                    visibleMenu={false}
                    content={({ index, option }) => (
                        <ContentActionVaccination
                            index={index}
                            option={option as QuestionVaccination}
                            onChangeTypeAction={({ dose, option }) => {
                                arrayProps?.replace?.(option.value as number, {
                                    ...option,
                                    dose,
                                })
                            }}
                        />
                    )}
                    name="vaccinations"
                    categories={steps}
                    category={{
                        label: t(specie || ''),
                        value: specie as string,
                    }}
                    options={items}
                    onChange={(checked, option) => {
                        arrayProps?.replace?.(option.value as number, {
                            ...option,
                            checked,
                        })
                    }}
                    onChangeCategory={() => {}}
                />
            )}
        </FieldArraySafe>
    )
}

export default VaccinationsOptions
