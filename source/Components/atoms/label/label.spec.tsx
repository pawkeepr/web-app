import { render, screen } from '@testing-library/react'
import Label from './label'

describe('Label component (Unit)', () => {
    it('renders label with correct props', () => {
        render(<Label id="my-label" label="My Label" required />)
        const labelElement = screen.getByTestId('label-my-label')
        expect(labelElement).toBeInTheDocument()
        expect(labelElement).toHaveTextContent('My Label')
        expect(labelElement).toHaveAttribute('for', 'my-label')
        expect(labelElement).toContainHTML(
            '<abbr class="font-bold text-secondary-500">*</abbr>',
        )
    })

    it('does not render label if label prop is not provided', () => {
        render(<Label id="my-label" />)
        const labelElement = screen.queryByTestId('label-my-label')
        expect(labelElement).toBeNull()
    })

    it('renders children before label text if endChildren prop is false', () => {
        render(
            <Label id="my-label" label="My Label" endChildren={false}>
                <input type="text" />
            </Label>,
        )
        const labelElement = screen.getByTestId('label-my-label')
        expect(labelElement.firstChild).toHaveAttribute('type', 'text')
        expect(labelElement.lastChild).toHaveTextContent('My Label')
    })

    it('renders children after label text if endChildren prop is true', () => {
        render(
            <Label id="my-label" label="My Label" endChildren>
                <input type="text" />
            </Label>,
        )
        const labelElement = screen.getByTestId('label-my-label')
        expect(labelElement.firstChild).toHaveTextContent('My Label')
        expect(labelElement.lastChild).toHaveAttribute('type', 'text')
    })
})
