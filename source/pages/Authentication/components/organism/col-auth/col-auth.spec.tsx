import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useAuth } from '~/contexts/auth-context';
import ColAuth from './col-auth';

describe('ColAuth (Unit)', () => {
    it('should render the component', async () => {
        vi.mock('~/contexts/auth-context', () => ({
            useAuth: () => ({
                signIn: () => { },
                password: '',
                username: '',
                onToggleRememberMe: () => { },
                onToggleVisiblePassword: () => { },
                rememberMe: false,
                visiblePassword: false,
            }),
        }));

        render(<ColAuth />);

        const usernameInput = screen.getByLabelText('Nome do Usuário:');
        const passwordInput = screen.getByLabelText('Senha');
        const rememberMeInput = screen.getByLabelText('Lembrar-me');
        const submitButton = screen.getByText('Entrar');

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpassword');
        await userEvent.click(rememberMeInput);
        await userEvent.click(submitButton);

        await waitFor(() => expect(useAuth().signIn).toHaveBeenCalled());
    });

    it('should toggle password visibility', () => {
        render(<ColAuth />);

        const passwordInput = screen.getByLabelText('Senha');
        const toggleButton = screen.getByTitle('Toggle password visibility');

        expect(passwordInput).toHaveAttribute('type', 'password');
        userEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        userEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should remember user when checkbox is checked', () => {
        render(<ColAuth />);
        const rememberCheckbox = screen.getByLabelText('Lembrar-me');

        expect(rememberCheckbox).not.toBeChecked();
        userEvent.click(rememberCheckbox);
        expect(rememberCheckbox).toBeChecked();
    });
});