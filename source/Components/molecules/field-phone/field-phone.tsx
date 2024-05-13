import type { InputControlProps } from '~/Components/molecules/field-control'

import type { InputMaskProps } from '@react-input/mask'
import FieldMasked from '../field-masked'

const FieldPhone = <Ctx,>({ ...props }: InputControlProps<InputMaskProps, Ctx>) => {
    const mask = '+55 (__) _ ____-____'

    return <FieldMasked {...props} mask={mask} replacement={{ _: /\d/ }} />
}

export default FieldPhone
