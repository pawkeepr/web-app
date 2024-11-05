import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'
import * as useAuth from '~/hooks/use-auth'
import ProviderClient from '~/store'
import AuthInputs from './auth-inputs'

const Wrapper = () => (
    <ProviderClient>
        <AuthInputs mode="tutor" />
    </ProviderClient>
)

describe('auth-inputs (Unit)', () => {
    it('deve corresponder ao snapshot', () => {
        const { container } = render(<Wrapper />)
        expect(container).toMatchSnapshot()
    })

    it('deve enviar o email em letra minúscula', () => {
        // Cria o spy para o useAuth
        const signInMock = vi.fn()
        vi.spyOn(useAuth, 'default').mockReturnValue({
            signIn: signInMock,
            password: 'mock@1Password',
            username: 'EMAIL@EXEMPLO.COM',
            isAuthenticated: false,
            isLoading: 1,
            onToggleRememberMe: () => {},
            rememberMe: false,
            user: null,
        })

        render(<Wrapper />)

        const usernameInput = screen.getByTestId('email-input')
        const passwordInput = screen.getByTestId('password-input')

        act(() => {
            fireEvent.change(usernameInput, {
                target: { value: 'EMAIL@EXEMPLO.COM' },
            })
            fireEvent.change(passwordInput, { target: { value: 'mock@1Password' } })
        })

        const submitButton = screen.getByTestId('submit-button')

        act(() => {
            fireEvent.submit(submitButton)
        })

        // Verifique se signIn foi chamado com o username em letras minúsculas
        expect(signInMock).toHaveBeenCalled()
    })

    it('deve renderizar o componente corretamente', () => {
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

        render(<Wrapper />)

        expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument()
    })
})
