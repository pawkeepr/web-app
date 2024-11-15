import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

if (!window.matchMedia) {
    window.matchMedia = () => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    })
}

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock

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
            password: 'mock@1Password',
            username: 'EMAIL@EXEMPLO.COM',
            isAuthenticated: false,
            isLoading: LOADING.IDLE,
            onToggleRememberMe: vi.fn(),
            rememberMe: false,
            user: null,
        })

        render(<Wrapper />)

        const usernameInput = screen.getByTestId('email-input')
        const passwordInput = screen.getByTestId('password-input')

        await userEvent.clear(usernameInput)
        await userEvent.type(usernameInput, 'EMAIL@EXEMPLO.COM')
        await userEvent.clear(passwordInput)
        await userEvent.type(passwordInput, 'mock@1Password')

        const submitButton = screen.getByTestId('submit-button')

        await userEvent.click(submitButton)

        /*expect(usernameInput).toHaveValue('EMAIL@EXEMPLO.COM')
        expect(passwordInput).toHaveValue('mock@1Password')*/

        expect(signInMock).toHaveBeenCalledWith({
            username: 'email@exemplo.com',
            password: 'mock@1Password',
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
