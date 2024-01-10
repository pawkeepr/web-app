import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import RouterProvider from '~/__mocks__/next-router'
import useAuth from '~/hooks/use-auth'
import Provider from '~/store'
import { AuthProvider } from './auth-context'

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <RouterProvider>
            <Provider>
                <AuthProvider>{children}</AuthProvider>
            </Provider>
        </RouterProvider>
    )
}

const Component = () => {
    const {
        isAuthenticated,
        visiblePassword,
        rememberMe,
        onToggleVisiblePassword,
        onToggleRememberMe,
    } = useAuth()

    return (
        <>
            <button onClick={onToggleVisiblePassword}>
                Toggle Password Visibility
            </button>
            <input
                type="checkbox"
                data-testid="visibility"
                checked={visiblePassword}
            />
            <button onClick={onToggleRememberMe}>Toggle Remember Me</button>
            <input type="checkbox" data-testid="rememberMe" checked={rememberMe} />
            {/* Add other data-testid elements for user, password, username, visiblePassword, rememberMe, and signIn */}
        </>
    )
}

describe('AuthContext (Unit)', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should toggle remember me', async () => {
        render(
            <TestWrapper>
                <Component />
            </TestWrapper>,
        )

        const button = screen.getByText('Toggle Remember Me')
        const rememberMeElement = screen.getByTestId('rememberMe')

        await userEvent.click(button)
        expect(rememberMeElement).toBeChecked()

        await userEvent.click(button)
        expect(rememberMeElement).not.toBeChecked()
    })

    it('should toggle visibility password', async () => {
        render(
            <TestWrapper>
                <Component />
            </TestWrapper>,
        )

        const button = screen.getByText('Toggle Password Visibility')
        const passwordVisibility = screen.getByTestId('visibility')

        await userEvent.click(button)
        expect(passwordVisibility).toBeChecked()

        await userEvent.click(button)
        expect(passwordVisibility).not.toBeChecked()
    })
})
