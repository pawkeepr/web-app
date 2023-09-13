import * as ReactLoader from 'react-loader-spinner';
import withControl from '~/Components/helpers/with-control';

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
    | 'Watch';

type LoadingProps = {
    size?: string | number;
    type?: KeysLoading;
    color?: string;
    height?: string;
}

const Loading = ({ size, type = 'Audio', color = "#09b285" }: LoadingProps) => {
    const Component = ReactLoader[type]


    return (
        <div className={`flex w-full justify-center items-center`}>
            <Component color={color} height={size} width={size} />
        </div>
    );
};

export default withControl(Loading);
