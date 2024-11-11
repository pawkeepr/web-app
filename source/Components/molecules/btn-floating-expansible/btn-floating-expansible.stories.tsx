import type { Meta, StoryObj } from "@storybook/react"
import { MdPets } from "react-icons/md"
import {
    BtnFloatingExpansible
} from "./btn-floating-expansible"
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

const meta = {
    title: "Components/Molecules/ButtonFloatingExpansible",
    component: BtnFloatingExpansible,
    parameters: {
        layout: "centered",
    },
    args: {
        title: "Some Title",
        icon: () => <MdPets />,
        childLinks: childrenMock,
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


type Story = StoryObj<typeof BtnFloatingExpansible>

export const Default: Story = {
    args: {
        icon: () => <MdPets />,
        title: "Some Title",
        childLinks: childrenMock,
    }
}


