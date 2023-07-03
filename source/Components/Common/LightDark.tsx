//constants

import useChangeLayoutMode from "~/hooks/use-change-layout-mode";

const LightDark = () => {
    const { onHandleChangeLayout } = useChangeLayoutMode();

    return (
        <div className="ms-1 header-item d-flex ">
            <button
                onClick={onHandleChangeLayout}
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode text-white"
            >
                <i className="bx bx-moon fs-22"></i>
            </button>
        </div>
    );
};

export default LightDark;
