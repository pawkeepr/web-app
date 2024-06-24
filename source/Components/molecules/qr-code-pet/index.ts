import withMobile from '~/Components/helpers/with-mobile'
import { default as ComponentMobile } from './qr-code-pet.mobile'
import { default as ComponentWeb } from './qr-code-pet.web'

export default withMobile(ComponentWeb, ComponentMobile)