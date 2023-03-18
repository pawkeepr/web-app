import { vi } from 'vitest';

export default vi.mock('~/services/helpers/auth', async () => {
    const getUser = vi.fn().mockResolvedValue({ data: { id: 1, name: 'John Doe' } })
    const postJwtLogin = vi.fn().mockResolvedValue({ data: { access_token: 'token' } })

    return {
        getUser,
        postJwtLogin
    }
})