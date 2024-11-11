import { render, screen } from '@testing-library/react'
import { Species } from '~/types/speciesType'
import AvatarPet, { strategiesAvatar } from './avatar-pet'

describe('AvatarPet component (Unit)', () => {
	it.each([...Object.keys(Species)])(
		'should render the correct avatar image for %s',
		(specie) => {
			render(
				<AvatarPet
					specie={specie as Species}
					name_pet="Test Pet"
					alt="Avatar do pet Test Pet"
				/>,
			)

			const avatarImage = screen.getByAltText('Avatar do pet Test Pet')
			const expectedSrc = strategiesAvatar.get(specie as Species)

			expect(avatarImage).toBeInTheDocument()
			expect(avatarImage).toHaveAttribute('src', expectedSrc)
		},
	)

	it('should render the default avatar image when no specie is provided', () => {
		render(
			<AvatarPet
				specie={null as unknown as Species}
				name_pet="Test Pet"
				alt="Avatar do pet Test Pet"
			/>,
		)

		const avatarImage = screen.getByAltText('Avatar do pet Test Pet')

		expect(avatarImage).toBeInTheDocument()
		expect(avatarImage).toHaveAttribute('src', '/icon-pet/other_primary.png')
	})

	it('should render the custom avatar image when src is provided', () => {
		const name_pet = 'Alfredo'
		render(
			<AvatarPet
				specie={null as unknown as Species}
				src="/icon-pet/custom.png"
				name_pet="Alfredo"
			/>,
		)

		const avatarImage = screen.getByAltText(`Avatar do pet ${name_pet}`)

		expect(avatarImage).toBeInTheDocument()
		expect(avatarImage).toHaveAttribute('src', '/icon-pet/custom.png')
		expect(avatarImage).toHaveAttribute('alt', `Avatar do pet ${name_pet}`)
	})
})
