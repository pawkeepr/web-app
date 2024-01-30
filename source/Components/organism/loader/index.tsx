import * as ReactLoader from 'react-loader-spinner'
import withControl from '~/Components/helpers/with-control'

export type KeysLoading =
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified'
    | 'Oval'
    | 'Plane'
    | 'Puff'
    | 'RevolvingDot'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Triangle'
    | 'Watch'
    | 'ProgressBar'

export type ReactLoaderGeneric = { [keyof in KeysLoading]: JSX.ElementType }

type LoadingProps = {
    size?: string | number
    type?: KeysLoading
    color?: string
    height?: number
    width?: number
    barColor?: string
    borderColor?: string
}

const Loader = ({
    size,
    type = 'Audio',
    color = '#09b285',
    height,
    width,
    ...props
}: LoadingProps) => {
    const Component = (ReactLoader as unknown as ReactLoaderGeneric)[type]

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <Component
                color={color}
                height={height || size}
                width={width || size}
                {...props}
            />
        </div>
    )
}

export default withControl(Loader)
