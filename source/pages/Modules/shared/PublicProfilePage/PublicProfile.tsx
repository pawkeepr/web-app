import type React from "react"
import useTutors from "~/store/hooks/tutor-by-id/use-tutors"

type PublicProfileProps = {
    id_tutor: string
}

const PublicProfile = ({id_tutor}: PublicProfileProps) => {
    
    const { data: tutor } = useTutors(id_tutor);
    
    return (
        <>
            <h1>Public Profile Page</h1>
        </>
    )
}

export default PublicProfile