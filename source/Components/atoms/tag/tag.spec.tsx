import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Tag from './tag'

describe('Tag component (Unit)', () => {
    it('should render the tag with correct text', () => {
        render(
            <Tag name="tag" selected={false}>
                Tag Text
            </Tag>,
        )
        const tagElement = screen.getByText('Tag Text')
        expect(tagElement).toBeInTheDocument()
    })

    it('should render the tag with selected style when selected prop is true', () => {
        render(
            <Tag name="tag" selected={true}>
                Tag Text
            </Tag>,
        )
        const iconElement = screen.getByTestId('icon-x')
        expect(iconElement).toBeInTheDocument()
    })

    it('should render the tag with disabled style when disabled prop is true', () => {
        render(
            <Tag name="tag" selected={false} disabled={true}>
                Tag Text
            </Tag>,
        )
        const iconElement = screen.queryByTestId('icon-x')
        expect(iconElement).not.toBeInTheDocument()
    })

    it('should call onClick function when tag is clicked', async () => {
        const onClick = vi.fn()
        render(
            <Tag name="tag" selected={false} onClick={onClick}>
                Tag Text
            </Tag>,
        )
        const tagElement = screen.getByText('Tag Text')
        await fireEvent.click(tagElement)
        expect(onClick).toHaveBeenCalled()
    })
})
