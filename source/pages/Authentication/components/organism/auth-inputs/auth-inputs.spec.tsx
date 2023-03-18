/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RouterProvider from '~/__mocks__/next-router';
import { AuthProvider } from '~/contexts/auth-context';
import ProviderClient from '~/store';
import Auth from './auth-inputs';

const Wrapper = () => (
    <RouterProvider>
        <ProviderClient>
            <AuthProvider>
                <Auth />
            </AuthProvider>
        </ProviderClient>
    </RouterProvider>
)

describe('Auth Unit (Unit)', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should render without errors', () => {
        const { baseElement } = render(<Wrapper />)

        expect(baseElement).toMatchSnapshot();
    });

    it('should enable button when form is valid', async () => {
        render(<Wrapper />)
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        act(() => {
            userEvent.type(usernameInput, 'test-username');
            userEvent.type(passwordInput, 'test-password');
        });

        expect(submitButton).toBeEnabled();
    });

    it('should toggle visible password when clicking the eye icon', async () => {
        render(<Wrapper />);
        const passwordInput = screen.getByTestId('password-input');
        const eyeIcon = screen.getByTestId('toggle-password');

        expect(passwordInput).toHaveAttribute('type', 'password');

        await userEvent.click(eyeIcon);

        expect(passwordInput).toHaveAttribute('type', 'text');

        await userEvent.click(eyeIcon);

        expect(passwordInput).toHaveAttribute('type', 'password');

    });

    it('should disable button when form is invalid', async () => {
        render(<Wrapper />)
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        await userEvent.type(usernameInput, ' ');
        await userEvent.type(passwordInput, ' ');

        expect(submitButton).toBeDisabled();
    });

});

