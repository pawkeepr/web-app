import Image from 'next/image';
import profileBG from '~/assets/images/profile-bg.jpg';

import { Input, Label } from 'reactstrap';

const CoverImage = () => {
  return (
        <div className='position-relative mx-n4 mt-n4'>
            <div className='profile-wid-bg profile-setting-img'>
                <Image src={profileBG} className='profile-wid-img' alt='' />

                <div className='overlay-content'>
                    <div className='text-end p-3'>
                        <div className='p-0 ms-auto rounded-circle profile-photo-edit'>
                            <Input
                                id='profile-foreground-img-file-input'
                                type='file'
                                className='profile-foreground-img-file-input'
                            />
                            <Label
                                htmlFor='profile-foreground-img-file-input'
                                className='profile-photo-edit btn btn-light'
                            >
                            <i className='ri-image-edit-line align-bottom me-1'></i> 
                            Change Cover
                        </Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverImage;
