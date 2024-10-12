import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FaPlusCircle, FaWhatsapp } from 'react-icons/fa'
import AddMedicalRecords from '~/Components/modals/add-medical-records'
import BtnFloating from '~/Components/molecules/btn-floating'
import FieldControl from '~/Components/molecules/field-control'
import QrCodePet from '~/Components/molecules/qr-code-pet'
import type { TabItem } from '~/Components/organism/horizontal-list'
import HorizontalTabs from '~/Components/organism/horizontal-list'
import { infoToast } from '~/store/helpers/toast'
import { usePetByIdV2 } from '~/store/hooks/pet-by-id/use-pets'
import type { IMainResponsibleGuardian, PetData } from '~/types/pet-v2'
import DefaultLayout from '../../_layouts/dashboard'
import MaintainPetPage from '../MaintainPetPage/MaintainPetPage'
import CardContainer from '../ProfilePage/components/CardContainer'
import PetProfileCard from './components/organisms/pet-profile-card'
import HistoricPet from './components/template/HistoricPet'
import MedicalRecords from './components/template/MedicalRecords'

const Tabs = (document?: string, id_pet?: string): TabItem[] => [
    {
        id: 1,
        title: 'Dados do Pet',
        href: '#tutors',
        tab: <MaintainPetPage document={document} id_pet={id_pet} />,
    },
    {
        id: 2,
        title: 'Prontuário',
        href: '#chart',
        tab: (
            <MedicalRecords
                document={document as string}
                id_pet={id_pet as string}
            />
        ),
    },
    {
        id: 3,
        title: 'Consultas Anteriores',
        href: '#before-consults',
        tab: <HistoricPet document={document} id_pet={id_pet} />,
    },
]

type HistoricPetPageProps = {
    document?: string
    id_pet?: string
}

const HistoricPetPage = ({ document, id_pet }: HistoricPetPageProps) => {
    const tabs = Tabs(document, id_pet)
    const router = useRouter()

    const {
        data: pet,
        isPending,
        error,
    } = usePetByIdV2(document as string, id_pet as string)

    useEffect(() => {
        if (!error) return
        if (!('response' in error)) return
        if (!error.response) return

        const response = error.response
        if (!(typeof response === 'object')) return
        if (!('status' in response)) return
        if (typeof response.status !== 'number') return

        switch (response.status) {
            case 404:
                infoToast('Pet não encontrado')

                setTimeout(() => {
                    router.push('/dashboard')
                }, 300)
                break
            default:
                break
        }
    }, [error])

    if (isPending) return <div>Carregando...</div>

    return (
        <DefaultLayout title="Histórico do Pet" searchBlock={false}>
            <div className="container mx-auto mobile:pb-24">
                <div className="flex flex-wrap flex-1 mobile:flex-col tablet:flex-col">
                    <div className="flex flex-col flex-1 w-full gap-1 px-2">
                        <PetProfileCard
                            main_responsible_guardian={
                                pet?.main_responsible_guardian as IMainResponsibleGuardian
                            }
                            pet_information={pet?.pet_information as PetData}
                            id={pet?.id}
                        />
                        <CardContainer className="bg-white rounded-2xl">
                            <h1 className="text-xs font-semibold text-gray-500">
                                Entre em contato com o responsável
                            </h1>
                            <div className="flex items-center">
                                <FieldControl
                                    text_align="right"
                                    startIcon={
                                        <FaWhatsapp className="w-5 h-5 text-green-500" />
                                    }
                                    ctx={{ whatsapp: '' }}
                                    name="whatsapp"
                                    mode="readonly"
                                    value={
                                        (pet?.main_responsible_guardian?.contact
                                            ?.whatsapp as string) || 'Não Informado'
                                    }
                                />
                            </div>
                        </CardContainer>
                        <CardContainer className="flex items-center justify-center w-full bg-white">
                            <p className="text-xs text-center text-gray-500">
                                Traga mais segurança para o seu pet!
                            </p>
                            <p className="text-xs text-center text-gray-500">
                                Imprima a TagPkeepr e use-o em sua coleira.
                            </p>
                            <br />

                            <p className="text-xs text-center text-gray-500">
                                Caso ele se perca, quem o encontrar poderá escanear
                                o código, acessar as informações do seu pet e entrar
                                em contato com você rapidamente.
                            </p>
                            <div className="flex flex-col items-center justify-center w-full">
                                <strong> TagPkeepr</strong>
                                <QrCodePet
                                    id_pet={id_pet as string}
                                    name_pet={
                                        pet?.pet_information?.name_pet as string
                                    }
                                />

                                <p className="text-xs text-center text-gray-500">
                                    Não se preocupe, os seus dados pessoais estarão
                                    seguros.
                                </p>
                            </div>
                        </CardContainer>
                    </div>
                    <div className="w-full flex flex-[3]  px-2 web:my-2 mobile:!flex-1 overflow-hidden">
                        <HorizontalTabs categories={tabs} menu />
                    </div>
                </div>
                <AddMedicalRecords
                    item={null}
                    pet={{
                        ...(pet?.pet_information as PetData),
                        id_pet: id_pet as string,
                    }}
                    cpf_cnpj={document as string}
                    id_pet={id_pet as string}
                >
                    {(showModal) => (
                        <BtnFloating
                            title="Adicionar Registro"
                            onClick={showModal}
                            icon={FaPlusCircle}
                        />
                    )}
                </AddMedicalRecords>
            </div>
        </DefaultLayout>
    )
}

export default HistoricPetPage
