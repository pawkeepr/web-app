import { render, screen } from '@testing-library/react'
import Img from './index'

describe('Img component (Unit)', () => {
    it('should render an image with the provided alt text', () => {
        const altText = 'Sample Alt Text'
        render(<Img src="path/to/image.jpg" alt={altText} />)
        const imageElement = screen.getByAltText(altText)
        expect(imageElement).toBeInTheDocument()
    })

    it('should pass additional props to the image element', () => {
        const className = 'custom-class'
        render(<Img src="path/to/image.jpg" alt="Alt Text" className={className} />)
        const imageElement = screen.getByAltText('Alt Text')
        expect(imageElement).toHaveClass(className)
    })
})
