import Feedback from '~/pages/Modules/shared/Feedback'

import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesGenericsPrivates from '~/helpers/get-server-side-props-pages-generic-privates'

const FeedbackPageNext = () => {
    return (
        <LayoutVeterinary>
            <Feedback />
        </LayoutVeterinary>
    )
}

export default FeedbackPageNext

export const getServerSideProps = getServerSidePropsPagesGenericsPrivates()
