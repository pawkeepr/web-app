import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import * as useAuth from '~/hooks/use-auth'
import ProviderClient from '~/store'
import AuthInputs from './auth-inputs'
import { LOADING } from '~/helpers/loading'

const Wrapper = () => (
    <ProviderClient>
        <AuthInputs mode="tutor" />
    </ProviderClient>
)

describe('auth-inputs (Unit)', () => {
    beforeEach(() => {
        vi.spyOn(useAuth, 'default').mockReturnValue({
            signIn: vi.fn(),
            password: 'mockPassword',
            username: 'mockUsername',
            isAuthenticated: false,
            isLoading: 1,
            onToggleRememberMe: () => {},
            rememberMe: false,
            user: null,
        })
    })
    it('deve corresponder ao snapshot', () => {
        const { container } = render(<Wrapper />)
        expect(container).toMatchSnapshot()
    })

    it('deve enviar o email em letra minúscula', async () => {
        const signInMock = vi.fn()
        vi.spyOn(useAuth, 'default').mockReturnValue({
            signIn: signInMock,
            password: 'mock@1password',
            username: 'EMAIL@GMAIL.COM',
            isAuthenticated: false,
            isLoading: LOADING.IDLE,
            onToggleRememberMe: vi.fn(),
            rememberMe: false,
            user: null,
        })

        render(<Wrapper />)

        /*const usernameInput = screen.getByTestId('email-input')
        const passwordInput = screen.getByTestId('password-input')

        await act(async () => {
            fireEvent.change(usernameInput, {
                target: { value: 'EMAIL@EXEMPLO.COM' },
            })
            fireEvent.change(passwordInput, { target: { value: 'mock@1Password' } })
        })*/

        const submitButton = screen.getByTestId('submit-button')

        await act(async () => {
            fireEvent.submit(submitButton)
        })

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
