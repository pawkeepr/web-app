import RadioGroup from "../radio-group/radio-group"

const items = [
    {
        id: 1,
        name: 'Sim',
        value: 1
    },
    {
        id: 2,
        name: 'Não',
        value: 0
    },
    {
        id: 3,
        name: 'Outro',
        value: 2
    }
]

type AnswerProps = {
    question: string
    name: string
}

type AnswerRadioProps = {
    answers: AnswerProps[]
    title?: string
}

const AnswerRadio = ({ answers, title }: AnswerRadioProps) => {
    return (
        <div className="grid grid-cols-3">
            <h3 className="col-span-2 text-base p-2">{title}</h3>
            {
                answers.map((answer, index) => (
                    <div className="grid grid-cols-3 col-span-3 p-1 m-1 border-[0.5px] dark:border-zinc-700 shadow-sm justify-center items-center" key={index}>

                        <h6 className="col-span-2 ml-1">
                            <strong>{(index + 1).toString().padStart(2, '0')}. </strong>
                            {answer.question}
                        </h6>
                        <RadioGroup className="col-span-1" items={items} name={answer.name} />
                    </div>
                ))
            }
        </div>
    )
}

export default AnswerRadio