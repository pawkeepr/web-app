import 'react-toastify/dist/ReactToastify.css'

// Formik
import { Formik, FormikHelpers } from 'formik'

import { BtnAvatar } from '~/Components/atoms/btn'
import { useAppDispatch } from '~/store/hooks'
// import ComboBoxFields from "./components/organisms/combo-box-fields/combo-box-fields";

type InitialValues = Partial<Nullable<any>>

import { EyeIcon } from '@heroicons/react/24/solid'
import Modal from '~/Components/organism/modal'
import ravena from '~/assets/images/ravena.jpeg'
import useModal from '~/hooks/use-modal'

const ViewAppointment = ({ children, item }) => {
    const { closeModal, open, showModal } = useModal()

    const dispatch = useAppDispatch()

    const onSubmit = (
        values: InitialValues,
        { resetForm }: FormikHelpers<InitialValues>,
    ) => {
        resetForm()
    }

    const initialValues: InitialValues = {
        date: '',
        time: '',
        type: '',
        reason: '',
        observations: '',
    }

    return (
        <>
            {children?.(showModal) || (
                <div className="flex justify-end text-white">
                    <EyeIcon className="h-8 w-8" onClick={() => showModal()} />
                </div>
            )}
            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="w-[750px] py-4"
            >
                <div className="flex flex-col w-full">
                    <h6 className="m-3 text-secondary-500 font-bold text-center uppercase">
                        Consulta Agendada
                    </h6>
                </div>

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationPet}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ isValid, handleSubmit }) => (
                        <>
                            <BtnAvatar
                                alt="Foto do Pet"
                                src={ravena}
                                name="avatar"
                            />
                            <div className="flex flex-row justify-evenly flex-wrap ">
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">
                                        Dados Da Consulta:
                                    </h3>
                                    <p className="text-gray-700">
                                        Data: 12/03/2023
                                    </p>
                                    <p className="text-gray-700">Horário: 17:00</p>
                                    <p className="text-gray-700">
                                        Razão da consulta: Vacinação
                                    </p>
                                    <p className="text-gray-700">
                                        Observações: Vacinação
                                    </p>
                                    <p className="text-gray-700">
                                        Data da próxima consulta: 12/12/2023
                                    </p>
                                    <p className="text-gray-700">
                                        Horário da próxima consulta: 12:00
                                    </p>
                                    <p className="text-gray-700">
                                        Nome da doença: Verme
                                    </p>
                                    <p className="text-gray-700">
                                        Sintomas: Vomitos
                                    </p>
                                    <p className="text-gray-700">Prevenção: </p>
                                    <p className="text-gray-700">Tratamento: </p>
                                    <p className="text-gray-700">
                                        Data identificada: 12/12/2023
                                    </p>
                                </div>
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">
                                        Dados Do Pet:
                                    </h3>
                                    <p className="text-gray-700">
                                        Nome do pet: Ravena
                                    </p>
                                    <p className="text-gray-700">Especie: Gato</p>
                                    <p className="text-gray-700">Sexo: feminino</p>
                                    <p className="text-gray-700">Microchip: 1294</p>
                                    <p className="text-gray-700">idade: 7</p>
                                    <p className="text-gray-700">Peso: 3kg</p>
                                    <p className="text-gray-700">Altura: 30cm</p>
                                    <p className="text-gray-700">
                                        Comprimento: 45cm
                                    </p>
                                    <p className="text-gray-700">IMC: 1294</p>
                                </div>
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">
                                        Dados Do Tutor:
                                    </h3>
                                    <p className="text-gray-700">
                                        Nome: Franciellem
                                    </p>
                                    <p className="text-gray-700">
                                        Email: jainefranciellen@gmail.com
                                    </p>
                                    <p className="text-gray-700">
                                        Contato: 79996733389
                                    </p>
                                    <p className="text-gray-700">
                                        CPF: 09029941588
                                    </p>
                                </div>
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">
                                        Dados do veterinário:
                                    </h3>
                                    <p className="text-gray-700">
                                        Nome: Sas dasim{' '}
                                    </p>
                                    <p className="text-gray-700">
                                        CRMV: Sisa dasdm
                                    </p>
                                    <p className="text-gray-700">
                                        CPF ou CNPJ: Simsd sad
                                    </p>
                                    <p className="text-gray-700">
                                        Email: jainefranciellen@gmail.com
                                    </p>
                                    <p className="text-gray-700">
                                        Contato: 79996733389
                                    </p>
                                </div>

                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">Endereço:</h3>
                                    <p className="text-gray-700">Cidade: Aracaju</p>
                                    <p className="text-gray-700">Estado: Sergipe</p>
                                    <p className="text-gray-700">Bairro: Atalaia</p>
                                    <p className="text-gray-700">
                                        Rua: João carvalho de aragão
                                    </p>
                                    <p className="text-gray-700">Número: 1205</p>
                                    {/* <p className="text-gray-700">latutude: 12</p>
                                        <p className="text-gray-700">longitude: 105</p>
                                        <p className="text-gray-700">precisão: 12</p>
                                        <p className="text-gray-700">altitude: 1</p>
                                        <p className="text-gray-700">velocidade: 05</p> */}
                                </div>
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">Anamnese:</h3>
                                    <p className="text-gray-700">
                                        Sistema digestivo: Sasdasim{' '}
                                    </p>
                                    <p className="text-gray-700">
                                        Sistema respiratório: Sisadasdm
                                    </p>
                                    <p className="text-gray-700">
                                        Sitema urinário: Simsdsad
                                    </p>
                                    <p className="text-gray-700">
                                        Sistema locomotor: Sasdasidm{' '}
                                    </p>
                                    <p className="text-gray-700">
                                        Sistema cardiovascular: Sisdsam{' '}
                                    </p>
                                </div>
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">Tratamento:</h3>
                                    <p className="text-gray-700">
                                        Medicamentos: sdfsdfsdf{' '}
                                    </p>
                                    <p className="text-gray-700">
                                        Vacinas: dfsdfsdf
                                    </p>
                                    <p className="text-gray-700">
                                        Exames: dsfsdfsdf
                                    </p>
                                    <p className="text-gray-700">
                                        Nutrição: fdsfsdf
                                    </p>
                                    <p className="text-gray-700">
                                        Doenças: dsfsdfs
                                    </p>
                                    <p className="text-gray-700">
                                        Testes rápidos: sdfsdfsdf
                                    </p>
                                </div>
                                <div className="p-2 mb-2">
                                    <h3 className="font-extrabold">Pagamento:</h3>
                                    <p className="text-gray-700">
                                        Forma de pagamento: crédito
                                    </p>
                                    <p className="text-gray-700">Valor: 100</p>
                                    <p className="text-gray-700">Moeda: real</p>
                                    <p className="text-gray-700">
                                        Número de parcelas: 1
                                    </p>
                                    <p className="text-gray-700">Status: pago</p>
                                    <p className="text-gray-700">
                                        Data: 12/12/2023
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

export default ViewAppointment
