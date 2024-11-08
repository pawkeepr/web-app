import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import * as useAuth from '~/hooks/use-auth'
import * as useModeProfile from '~/hooks/use-mode'
import ProviderClient from '~/store'
import SignIn from './SignIn'
import { LOADING } from '~/helpers/loading'
import { ModeProfile } from '~/types/profile'
import * as selector from '~/store/hooks'

const Wrapper = () => (
    <ProviderClient>
        <SignIn bgImage="/bg-sign-in.webp" />
    </ProviderClient>
)

describe('SignIn (Unit)', () => {
    it('deve corresponder ao snapshot', () => {
        const { container } = render(<Wrapper />)
        expect(container).toMatchSnapshot()
    })

    it('deve ter o atributo href para page /tutor/sign-up no modo tutor', async () => {
        vi.spyOn(useModeProfile, 'default').mockReturnValueOnce({
            mode: ModeProfile.tutor,
        })

        render(<Wrapper />)

        const createAccoutButton = screen.getByText('Criar Conta')

        await act(async () => {
            fireEvent.click(createAccoutButton)
        })

        expect(createAccoutButton).toHaveAttribute('href', '/tutor/sign-up')
    })

    it('deve ter o atributo href para page /veterinary/sign-up no modo vet', async () => {
        vi.spyOn(useModeProfile, 'default').mockReturnValueOnce({
            mode: ModeProfile.vet,
        })

        render(<Wrapper />)

        const createAccoutButton = screen.getByText('Criar Conta')

        await act(async () => {
            fireEvent.click(createAccoutButton)
        })

        expect(createAccoutButton).toHaveAttribute('href', '/veterinary/sign-up')
    })

    /*it('deve estar carregando durante a execucao do login', async () => {
        vi.spyOn(selector, 'useAppSelector').mockReturnValue({
            Login: { isLoading: LOADING.PENDING },
        })

        render(<Wrapper />)

        const loaderComponent = screen.getByTestId('loading-indicator')

        expect(loaderComponent).toBeInTheDocument()
    })*/
})
