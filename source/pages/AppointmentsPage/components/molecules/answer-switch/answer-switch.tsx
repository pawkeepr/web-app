import { Switch } from '@headlessui/react';
import { useField } from 'formik';
import { useState } from 'react';
import ControlSwitch from '~/Components/molecules/control-switch-div/switch';

type AnswerProps = {
    question: string;
    name: string;
};

type AnswerSwitchProps = {
    answers: AnswerProps[];
    name: string;
    title: string;
    onClick?: () => void;
    color?: 'primary' | 'secondary';
};

const AnswerSwitch = ({
    answers,
    title,
    name,
    onClick,
    color = 'primary',
}: AnswerSwitchProps) => {
    const [enabled, setEnabled] = useState<string[]>([]);

    const [field, meta, helpers] = useField(`anamnese.${name}`);

    const { setValue } = helpers;

    function onChange(e: any, name: string) {
        if (e) {
            return setEnabled((state) => {
                const result = [...state, name];
                setValue(result);
                return result;
            });
        }

        setEnabled((state) => {
            const result = state.filter((value) => value !== name);
            setValue(result);
            return result;
        });
    }

    return (
        <ControlSwitch name={name} label={title}>
            <div className="gap-2">
                {answers.map((answer, index) => (
                    <div
                        className="flex col-span-full p-1 m-1 my-4 border-[0.5px] dark:border-zinc-700 shadow-sm justify-between items-center"
                        key={index}
                    >
                        <h6 className="col-span-2 ml-1">
                            <strong>
                                {(index + 1).toString().padStart(2, '0')}.{' '}
                            </strong>
                            {answer.question}
                        </h6>
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <span className="text-xs font-semibold text-gray-500">
                                Não
                            </span>
                            <div className="align-middle lg:w-16 lg:h-7 w-[3.72rem] h-6">
                                <Switch
                                    onClick={onClick}
                                    checked={enabled.includes(answer.name)}
                                    onChange={(e) => onChange(e, answer.name)}
                                    className={`${
                                        enabled.includes(answer.name)
                                            ? `bg-${color}-500`
                                            : `bg-gray-300`
                                    }
                        relative inline-flex h-full w-full shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                        aria-hidden="true"
                                        className={`${
                                            enabled.includes(answer.name)
                                                ? 'translate-x-9'
                                                : 'translate-x-0'
                                        }
                        pointer-events-none inline-block lg:h-[24px] lg:w-[24px] h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                    />
                                </Switch>
                            </div>
                            <span className="text-xs font-semibold text-gray-500">
                                Sim
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </ControlSwitch>
    );
};

export default AnswerSwitch;
