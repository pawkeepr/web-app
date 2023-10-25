import { Switch } from "@headlessui/react";
import { useState } from "react";

type SwitchProps = {
    className?: string;
    children?: React.ReactNode;
    label: string;
    onClick?: () => void;
};

const ControlSwitch = ({
    className,
    children,
    label,
    onClick,
}: SwitchProps) => {
    const [enabled, setEnabled] = useState<boolean>(false);

    return (
        <div className="mb-2">
            <div className="flex justify-between items-center gap-2 mb-2">
                <span className="font-bold">{label}</span>
                <div className="w-16 max-h-max">
                    <Switch
                        onClick={onClick}
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? "bg-secondary-500" : "  bg-secondary-600"
                            }
            relative inline-flex h-full w-full shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${enabled ? "translate-x-9" : "translate-x-0"
                                }
              pointer-events-none inline-block lg:h-[24px] lg:w-[24px] h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>
            </div>
            {enabled && children}
        </div>
    );
};

export default ControlSwitch;
