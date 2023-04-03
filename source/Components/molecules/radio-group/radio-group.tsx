import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'

import cn from 'classnames'

const plans = [
    {
        name: 'Macho',
        value: 'male'
    },
    {
        name: 'Fêmea',
        value: 'female'
    },
    {
        name: 'Indefinido',
        value: 'unknown'
    }
]

export default function Example() {
    const [selected, setSelected] = useState(plans[0])

    return (
        <div className="w-full">
            <div className="mx-auto w-full relative">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="">Server size</RadioGroup.Label>
                    <div className="flex lg:flex-col md:flex-col flex-row row-auto lg:col-auto md:col-auto">
                        {plans.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ checked }) =>
                                    cn({
                                        'relative flex cursor-pointer rounded-lg px-2 py-0 focus:outline-none min-w-min h-8 mx-1': true,
                                        'items-center justify-center': true,
                                        'bg-sky-900 bg-opacity-75': checked
                                    })
                                }
                            >
                                {({ checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={
                                                            cn({
                                                                'font-medium': true,
                                                                'text-gray-50': checked,
                                                                'text-gray-400': !checked,
                                                            })
                                                        }
                                                    >
                                                        {plan.name}
                                                    </RadioGroup.Label>

                                                </div>
                                            </div>

                                            <div className={
                                                cn({
                                                    "shrink-0 ml-2": true,
                                                    "text-gray-50": checked,
                                                    "text-gray-400": !checked,
                                                })
                                            }>
                                                <CheckIcon className="h-6 w-6" />
                                            </div>

                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
