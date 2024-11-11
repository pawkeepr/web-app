import { render, screen } from '@testing-library/react'
import CardTutor from './card-tutor'

describe('CardTutor component (Unit)', () => {
	const mockPet = {
		name_pet: 'Max',
		specie: 'Dog',
		race: 'Labrador',
		date_birth: '2022-01-01',
	}

	const mockTutor = {
		name: 'Fulano',
		cpf_cnpj: '123456789',
		contact: {
			email: 'test@example.com',
			phone: '1234567891',
			whatsapp: '1234567890',
		},
	}

	const mockDate = '2022-12-31'
	const mockTime = '10:00'

	it('should render props', () => {
		render(
			<CardTutor
				pet={mockPet}
				tutor={mockTutor}
				date_consultation={mockDate}
				time_consultation={mockTime}
			/>
		)

		const petName = screen.getByText(mockPet.name_pet)
		expect(petName).toBeInTheDocument()

		const petSpecie = screen.getByText('Dog, Labrador')
		expect(petSpecie).toBeInTheDocument()

		const petBirth = screen.getByText(mockPet.date_birth)
		expect(petBirth).toBeInTheDocument()

		const tutorName = screen.getByText(mockTutor.name)
		expect(tutorName).toBeInTheDocument()

		const tutorCpf = screen.getByText(mockTutor.cpf_cnpj)
		expect(tutorCpf).toBeInTheDocument()

		const tutorEmail = screen.getByText(mockTutor.contact.email)
		expect(tutorEmail).toBeInTheDocument()

		const tutorPhone = screen.getByText(mockTutor.contact.phone)
		expect(tutorPhone).toBeInTheDocument()

		const tutorWhatsapp = screen.getByText(mockTutor.contact.whatsapp)
		expect(tutorWhatsapp).toBeInTheDocument()

		const date = screen.getByText(`30/12/2022 às ${mockTime}`)
		expect(date).toBeInTheDocument()
	})
})