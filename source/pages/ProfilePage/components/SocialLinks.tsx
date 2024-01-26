// path/filename: src/components/SocialLinks.js

import { Input } from 'reactstrap'
import CardContainer from './CardContainer'

const SocialLinks = () => {
    return (
        <CardContainer>
            <div className="mb-3 d-flex">
                <div className="avatar-xs d-block flex-shrink-0 me-3">
                    <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                        <i className="ri-github-fill" />
                    </span>
                </div>
                <Input
                    type="email"
                    className="form-control"
                    id="gitUsername"
                    placeholder="Username"
                    defaultValue="@daveadame"
                />
            </div>
            // ... similar structure for other social links
        </CardContainer>
    )
}

export default SocialLinks
