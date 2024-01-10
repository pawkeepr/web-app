import { FieldArray, FieldArrayConfig } from 'formik'
import { ObjPaths } from '~/types/helpers'

type FieldArraySafeProps<Ctx = undefined> = FieldArrayConfig & {
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
}

const FieldArraySafe = <Ctx,>(props: FieldArraySafeProps<Ctx>) => (
    <FieldArray {...props} />
)

export default FieldArraySafe
