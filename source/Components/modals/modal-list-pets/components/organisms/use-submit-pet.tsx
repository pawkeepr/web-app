import { useEffect } from 'react'
import useThrottle from '~/hooks/use-throttle'

type UseSubmitPetProps = {
    handleSubmit: () => void
}

const useSubmitPet = ({ handleSubmit }: UseSubmitPetProps) => {

    const WAIT = 500
    const handleSubmitThrottle = useThrottle(handleSubmit, WAIT)

    useEffect(() => {
        handleSubmitThrottle()
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

}

export default useSubmitPet