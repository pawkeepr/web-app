import Feedback from '~/pages/Modules/shared/Feedback'

import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesVeterinaryPrivates from '~/helpers/get-server-side-props-pages-veterinary-privates'

const FeedbackPageNext = () => {
    return (
        <LayoutVeterinary>
            <Feedback />
        </LayoutVeterinary>
    )
}

export default FeedbackPageNext

export const getServerSideProps = getServerSidePropsPagesVeterinaryPrivates()
