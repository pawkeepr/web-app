// path/filename: src/components/SocialLinks.js

import {
    // FaEnvelope,
    // FaFacebook,
    // FaInstagram,
    // FaTiktok,
    FaWhatsapp,
} from 'react-icons/fa'
import FieldControl from '~/Components/molecules/field-control'
import CardContainer from './CardContainer'

type SocialLinksProps = {
    whatsapp?: string
}

const SocialLinks = ({ whatsapp }: SocialLinksProps) => {
    return (
        <CardContainer className="bg-white ">
            {/* <div className="flex items-center mb-3">
                <FaFacebook className="w-6 h-6 mr-3 text-blue-600" />
                <Input
                    type="text"
                    className="form-control"
                    id="facebookUsername"
                    placeholder="Facebook Username"
                    defaultValue="@daveadame"
                />
            </div>
            <div className="flex items-center mb-3">
                <FaEnvelope className="w-6 h-6 mr-3 text-red-500" />
                <Input
                    type="email"
                    className="form-control"
                    id="emailAddress"
                    placeholder="Email Address"
                    defaultValue="dave@example.com"
                />
            </div> */}
            <div className="flex items-center mb-3">
                <FieldControl
                    text_align="right"
                    startIcon={<FaWhatsapp className="w-5 h-5 text-green-500" />}
                    ctx={{ whatsapp: '' }}
                    name="whatsapp"
                    mode="readonly"
                    value={whatsapp || 'Não Informado'}
                />
            </div>
            {/* <div className="flex items-center mb-3">
                <FaInstagram className="w-6 h-6 mr-3 text-pink-500" />
                <Input
                    type="text"
                    className="form-control"
                    id="instagramUsername"
                    placeholder="Instagram Username"
                    defaultValue="@daveadame"
                />
            </div>
            <div className="flex items-center mb-3">
                <FaTiktok className="w-6 h-6 mr-3 text-black" />
                <Input
                    type="text"
                    className="form-control"
                    id="tiktokUsername"
                    placeholder="TikTok Username"
                    defaultValue="@daveadame"
                />
            </div> */}
        </CardContainer>
    )
}

export default SocialLinks
