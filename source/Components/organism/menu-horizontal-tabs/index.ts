import withMobile from '~/Components/helpers/with-mobile'
import { default as ComponentMobile } from './menu-horizontal-tabs.mobile'
import { default as ComponentWeb } from './menu-horizontal-tabs.web'

export default withMobile(ComponentWeb, ComponentMobile)
