import 'bootstrap/dist/css/bootstrap.css';
import '~/globals.scss';

import Provider from "~/store";

type LayoutProps = {
    children: React.ReactNode
}


const LayoutDefault = ({ children }: LayoutProps) => {
    return (
        <div className="layout-default">
            <Provider>
                {children}
            </Provider>
        </div>
    )
}

export default LayoutDefault