import { FieldArray, type FieldArrayConfig } from 'formik'
import type { ArrayPaths } from '~/types/helpers'

type FieldArraySafeProps<Ctx = undefined> = FieldArrayConfig & {
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ArrayPaths<Ctx>
}

const FieldArraySafe = <Ctx,>(props: FieldArraySafeProps<Ctx>) => (
    <FieldArray {...props} />
)

export default FieldArraySafe
