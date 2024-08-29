import useVetById from "~/store/hooks/vet-by-id/use-vets"
import UserProfileCard from "../ProfilePage/components/UserProfileCard"
import SocialLinks from "../ProfilePage/components/SocialLinks"

type VeterinaryProfilePageProps = {
    id_vet: string
}

type InstagramProfilePreviewProps = {
    username: string
}

// TODO: turn into a single file component
const InstagramProfilePreview = ({username}: InstagramProfilePreviewProps) => {
    return (
        <>
            { username && 
                <div className='flex justify-center'>
                    <iframe id="frame" width="380" height="550" src={`https://www.instagram.com/${username}/embed`}></iframe>
                </div>
            }
        </>
    )
}

const VeterinaryProfilePage = ({id_vet} : VeterinaryProfilePageProps) => {
    const { data: profile } = useVetById(id_vet)
    
    return (
        <>
           <div className="container mx-auto mt-2">
                <div className="flex justify-center mobile:flex-col">
                    <div className="flex flex-col flex-1 w-full gap-1 m-1 border border-gray-200 ">
                        <UserProfileCard
                            avatar={profile?.user_information?.url_img}
                        />
                        <SocialLinks instagram={profile?.user_information?.contact?.instagram} />
                        { profile?.user_information?.contact?.instagram &&
                            <InstagramProfilePreview username={profile.user_information.contact.instagram}/>
                        }
                    </div>
                    <div className="w-full flex flex-[3] web:mt-0 mobile:!flex-1 overflow-hidden">

                    </div>
                </div>
            </div>
        </>
    )
}


export default VeterinaryProfilePage