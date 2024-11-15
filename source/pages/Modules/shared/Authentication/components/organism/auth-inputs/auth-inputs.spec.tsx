import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LOADING } from '~/helpers/loading'
import * as useAuth from '~/hooks/use-auth'
import ProviderClient from '~/store'
import AuthInputs from './auth-inputs'

const Wrapper = () => (
    <ProviderClient>
        <AuthInputs mode="tutor" />
    </ProviderClient>
)

describe('auth-inputs (Unit)', () => {
    const signInMock = vi.fn()
    beforeEach(() => {
        vi.spyOn(useAuth, 'default').mockReturnValue({
            signIn: signInMock,
            password: '',
            username: '',
            isAuthenticated: false,
            isLoading: LOADING.IDLE,
            onToggleRememberMe: vi.fn(),
            rememberMe: false,
            user: null,
        })
    })

    it('deve corresponder ao snapshot', () => {
        const { container } = render(<Wrapper />)
        expect(container).toMatchSnapshot()
    })

    it('deve enviar o email em letra minúscula', async () => {
        const user = userEvent.setup()
        render(<Wrapper />)

        const usernameInput = screen.getByTestId('email-input')
        const passwordInput = screen.getByTestId('password-input')

        await user.type(usernameInput, 'EMAIL@GMAIL.COM')
        await user.type(passwordInput, 'mock@1password')

        const submitButton = screen.getByTestId('submit-button')

        await act(async () => {
            fireEvent.submit(submitButton)
        })

        await user.click(submitButton)

        expect(signInMock).toHaveBeenCalledWith({
            username: 'email@gmail.com',
            password: 'mock@1password',
            mode: 'tutor',
        })
    })

    it('deve ter o atributo href para page /forgot-password', async () => {
        render(<Wrapper />)

        const forgotPasswordButton = screen.getByText('Esqueceu a senha?')

        await act(async () => {
            fireEvent.click(forgotPasswordButton)
        })

        expect(forgotPasswordButton).toHaveAttribute('href', '/forgot-password')
    })

    it('deve renderizar o componente corretamente', () => {
        render(<Wrapper />)

        expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument()
    })
})
