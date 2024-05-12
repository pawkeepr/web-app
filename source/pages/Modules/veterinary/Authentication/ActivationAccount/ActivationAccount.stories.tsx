import type { Meta, StoryObj } from '@storybook/react'
import Provider from '~/store'

import { useEffect, useState } from 'react'
import { useAppDispatch } from '~/store/hooks'
import { onChangeUsername } from '~/store/slices/auth/login/slice'
import ActivationAccount from './ActivationAccount'

const Template = () => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(onChangeUsername('teste@example.com'))
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <ActivationAccount />
}

const RootTemplate = () => {
    return (
        <Provider>
            <Template />
        </Provider>
    )
}

const meta: Meta<typeof Template> = {
    component: RootTemplate,
    title: 'Modules/Veterinary/Authentication/ActivationAccount',
}

export default meta
type Story = StoryObj<typeof RootTemplate>

export const Default: Story = {
    args: {},
}
