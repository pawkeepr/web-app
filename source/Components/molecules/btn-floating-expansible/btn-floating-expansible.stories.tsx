import type { Meta, StoryFn } from "@storybook/react"
import { MdPets } from "react-icons/md"
import {
    BtnFloatingExpansible,
    type BtnFloatingExpansibleProps,
} from "./btn-floating-expansible"

const meta = {
    title: "Components/Molecules/ButtonFloatingExpansible",
    component: BtnFloatingExpansible,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        "position-x": {
            description: "Horizontal position of the button",
            type: {
                name: "string",
                raw: "'left' | 'right'",
                required: false,
            },
            options: ["left", "right"],
            control: {
                type: "select",
                labels: {
                    right: "Right",
                    left: "Left",
                },
            },
        },
        "position-y": {
            description: "Vertical position of the button",
            type: {
                name: "string",
                raw: "'top' | 'bottom'",
                required: false,
            },
            options: ["top", "bottom"],
            control: {
                type: "select",
                labels: {
                    bottom: "Bottom",
                    top: "Top",
                },
            },
        },
    },
} satisfies Meta<typeof BtnFloatingExpansible>
export default meta

const Template: StoryFn<BtnFloatingExpansibleProps> = (args) => (
    <BtnFloatingExpansible {...args} />
)

const childrenMock = [
    {
        title: "Title 1",
        icon: () => <MdPets />,
        onClick: () => { },
    },
    {
        title: "Title 2",
        icon: () => <MdPets />,
        href: "/tutor/pet",
    },
    {
        title: "Title 3",
        icon: () => <MdPets />,
        href: "/tutor/pet",
    },
]

export const Primary = Template.bind({})
Primary.args = {
    icon: () => <MdPets />,
    title: "Some Title",
    childLinks: childrenMock,
}
