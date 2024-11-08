import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ErrMessage from './index'

describe('ErrMessage component (Unit)', () => {
    it('should render the error message', () => {
        const message = 'This is an error message'
        render(<ErrMessage message={message} />)
        const errorMessage = screen.getByText(message)
        expect(errorMessage).toBeInTheDocument()
    })

    it('should not render when message prop is empty', () => {
        render(<ErrMessage message="" data-testid="err-message" />)
        const errorMessage = screen.queryByTestId('err-message')
        expect(errorMessage).not.toBeInTheDocument()
    })

    it('should pass additional HTML attributes to the component', async () => {
        const message = 'This is an error message'
        const onClick = vi.fn()

        render(
            <ErrMessage
                message={message}
                data-testid="err-message"
                className="custom-class"
                onClick={onClick}
            />,
        )

        const errorMessage = screen.getByTestId('err-message')
        expect(errorMessage).toHaveClass('custom-class')

        await userEvent.click(errorMessage)
        expect(onClick).toHaveBeenCalled()
    })
})
