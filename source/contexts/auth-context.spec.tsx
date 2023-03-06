import '~/__mocks__/auth-helpers';
import '~/__mocks__/next-navigations';

import { renderHook } from '@testing-library/react-hooks';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RouterProvider from '~/__mocks__/next-router';
import Provider from "~/store";
import { AuthProvider, useAuth } from './auth-context';


const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <RouterProvider>
            <Provider>
                <AuthProvider>{children}</AuthProvider>
            </Provider>
        </RouterProvider>
    );
};

describe('AuthContext (Unit)', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should sign in user', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => <TestWrapper>{children}</TestWrapper>

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });

        result.current.onToggleRememberMe();
        result.current.onToggleVisiblePassword();
        result.current.onToggleVisiblePassword();
        result.current.signIn({
            username: 'testuser',
            password: 'testpassword',
        });

        await waitForNextUpdate({ timeout: 15000 });

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user.name).toEqual('John Doe');
    });
});
