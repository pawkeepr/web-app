// path/filename: src/components/UserProfileCard.js

import Image from 'next/image'
import { Input, Label } from 'reactstrap'
import avatar1 from '~/assets/images/users/avatar-1.jpg'
import CardContainer from './CardContainer'

const UserProfileCard = () => {
    return (
        <CardContainer className="mt-n5">
            <div className="p-4">
                <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <Image
                            src={avatar1}
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                            alt="user-profile"
                        />
                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <Input
                                id="profile-img-file-input"
                                type="file"
                                className="profile-img-file-input"
                            />
                            <Label
                                htmlFor="profile-img-file-input"
                                className="profile-photo-edit avatar-xs"
                            >
                                <span className="avatar-title rounded-circle bg-light text-body">
                                    <i className="ri-camera-fill" />
                                </span>
                            </Label>
                        </div>
                    </div>
                    <h5 className="mb-1">Anna Adame</h5>
                    <p className="text-muted mb-0">Lead Designer / Developer</p>
                </div>
            </div>
        </CardContainer>
    )
}

export default UserProfileCard
