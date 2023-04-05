import { useState } from 'react'


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
                {
                    plans.map((plan, planIdx) => (
                        <div className="form-check form-radio-outline form-radio-dark" key={planIdx}>
                            <input className="form-check-input" type="radio" name="formradiocolor15" id="formradioRight19" defaultChecked />
                            <label className="form-check-label" htmlFor="formradioRight19">
                                {plan.name}
                            </label>
                        </div>
                    ))
                }
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
