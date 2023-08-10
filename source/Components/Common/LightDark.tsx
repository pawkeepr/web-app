//constants

import useChangeLayoutMode from "~/hooks/use-change-layout-mode";

const LightDark = () => {
    const { onHandleChangeLayout, mode } = useChangeLayoutMode();

    return (
        <div className="ms-1 header-item flex ">
            <button
                onClick={onHandleChangeLayout}
                type="button"
                className="btn border-none active:outline-none text-white"
            >
                <span>A</span>
            </button>
        </div>
    );
};

export default LightDark;
