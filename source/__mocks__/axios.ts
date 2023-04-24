import axiosMock from 'axios-mock-adapter';
import { vi } from 'vitest';
import { api } from '~/services/api';

export default vi.mock('axios', async () => {
    const actual = await vi.importActual("axios")
    const mock = new axiosMock(api, { delayResponse: 2000 });

    mock.onGet('/usuarios/login').reply(200, { id: 1, name: 'John' });
    mock.onGet('/usuarios/logado').reply(200, { id: 1, name: 'John' });

    return {
        ...actual,
        default: mock

    };
})

