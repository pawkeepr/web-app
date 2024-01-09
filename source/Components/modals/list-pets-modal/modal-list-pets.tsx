import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import Modal from '~/Components/organism/modal';
import useModal from '~/hooks/use-modal';
import useSteps from '~/hooks/use-steps';
import useProfileVeterinary from '~/hooks/use-veterinary';
import routes from '~/routes';
import useListPetsOfTutor from '~/store/hooks/list-pets-of-tutor';
import { IPet } from '~/types/pet';
import { IPetV2 } from '~/types/pet-v2';
import StepDocument from './components/steps/step-document';
import StepListBreeds from './components/steps/step-list-breeds';
import StepListGender from './components/steps/step-list-gender';
import StepListPets from './components/steps/step-list-pets';
import StepListSpecies from './components/steps/step-list-species';
import StepTutor from './components/steps/step-tutor';
import { ModalConfirmProps, StepProps } from './types';

const STEPS = [
    {
        id: 1,
        title: 'Documento',
        component: (props: StepProps) => <StepDocument {...props} />,
    },
    {
        id: 2,
        title: 'Pets',
        component: (props: StepProps) => <StepListPets {...props} />,
    },
    {
        id: 3,
        title: 'Espécie',
        component: (props: StepProps) => <StepListSpecies {...props} />,
    },
    {
        id: 4,
        title: 'Raça',
        component: (props: StepProps) => <StepListBreeds {...props} />,
    },
    {
        id: 5,
        title: 'Gênero',
        component: (props: StepProps) => <StepListGender {...props} />,
    },
    {
        id: 6,
        title: 'Tutor',
        component: (props: StepProps) => <StepTutor {...props} />,
    },
];

const getNameTutor = (pets: Pick<IPetV2, 'main_responsible_guardian'>) => {
    const { name, last_name, first_name } = pets.main_responsible_guardian;
    return name || `${first_name} ${last_name}`;
};

const ModalListPets = ({
    children,
    label,
    selectedTabInitial = 1,
}: ModalConfirmProps) => {
    const [document, setDocument] = useState('');
    const { closeModal, open, showModal } = useModal();

    const router = useRouter();

    const { nextStep, onChangeSelectedTab, previousStep, selectedTab } =
        useSteps(STEPS, selectedTabInitial);

    const handleNavigate = useCallback(
        (pet: IPetV2) => {
            setTimeout(() => {
                router.push(
                    `${routes.dashboard.new.appointments}?document=${document}&pet=${pet.id}`,
                );
            }, 300);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [document],
    );

    const {
        activeData: pets,
        handleSubmit,
        isLoading,
    } = useListPetsOfTutor(document, 'simple', closeModal);
    const veterinary = useProfileVeterinary();

    const initialValues: IPet = {
        name: '',
        cpf_tutor: document,
        specie: 'unknown',
        race: 'unknown',
        ownerEmergencyContact: {
            cpf_cnpj: document,
            phone:
                pets && pets?.length > 0
                    ? (pets[0].main_responsible_guardian.contact
                          .phone as string)
                    : '',
            email:
                pets && pets?.length > 0
                    ? (pets[0].main_responsible_guardian.contact
                          .email as string)
                    : '',
            name: pets && pets?.length > 0 ? getNameTutor(pets[0]) : '',
            lastName:
                pets && pets?.length > 0
                    ? (pets[0].main_responsible_guardian.last_name as string)
                    : '',
            whatsapp:
                pets && pets?.length > 0
                    ? (pets[0].main_responsible_guardian.contact
                          .whatsapp as string)
                    : '',
        },
        castrated: 'no',
        date_birth: '2021-01-01', // dado falso para não dar erro no backend
        sex: 'unknown',
        veterinary,
    };

    const onChangeDocument = (doc: string) => {
        setDocument(doc);
    };

    const onSubmit = useCallback(
        async (values: IPet) => {
            const pet = await handleSubmit(values);

            if (!pet) return;

            handleNavigate(pet);
            closeModal();
        },
        [handleSubmit, handleNavigate, closeModal],
    );

    return (
        <>
            {children &&
                children({ onChangeOpen: showModal, onChangeDocument })}
            {!children && (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => showModal()}
                        className="
                                rounded-md 
                                bg-secondary-500 bg-opacity-20 
                                px-4 py-2 text-sm 
                                font-medium 
                                text-white 
                                hover:bg-opacity-30 
                                focus:outline-none 
                                focus-visible:ring-2 
                                focus-visible:ring-white 
                                focus-visible:ring-opacity-75
                            "
                    >
                        {label}
                    </button>
                </div>
            )}

            <Modal
                onOpen={() => showModal()}
                onClose={() => {
                    onChangeSelectedTab(selectedTabInitial);
                    closeModal();
                }}
                modal
                nested
                open={open}
                lockScroll
                className="py-4 min-h-[calc(100vh-4rem)] !overflow-x-hidden"
            >
                <Tab.Group
                    selectedIndex={selectedTab}
                    onChange={onChangeSelectedTab}
                    defaultIndex={selectedTabInitial}
                >
                    <h1 className="text-center font-bold text-2xl">
                        Adicionar Pet
                    </h1>
                    <h5 className="text-center text-gray-500 mb-2">
                        Selecione ou Adicione um Pet para prosseguir na
                        consulta.
                    </h5>
                    <Tab.List className="flex flex-row w-full justify-between">
                        {STEPS.map((item, index) => (
                            <Tab key={item.id} className="hidden" />
                        ))}
                    </Tab.List>
                    <div className="flex flex-row w-full justify-between">
                        {STEPS.map((item, index) => (
                            <div
                                key={item.id}
                                className={cn(
                                    'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                                    {
                                        'text-primary-500':
                                            selectedTab === index,
                                        'text-gray-400': selectedTab !== index,
                                    },
                                )}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={onSubmit}
                    >
                        <Tab.Panels className="w-full h-full relative">
                            {STEPS.map(
                                ({ component: Component, id }, index) => (
                                    <Tab.Panel key={id} tabIndex={index}>
                                        <Component
                                            onChangeStep={onChangeSelectedTab}
                                            pets={pets || []}
                                            onChangeDocument={onChangeDocument}
                                            handleNavigate={handleNavigate}
                                            nextStep={nextStep}
                                            isLoading={isLoading}
                                            previousStep={previousStep}
                                        />
                                    </Tab.Panel>
                                ),
                            )}
                        </Tab.Panels>
                    </Formik>
                </Tab.Group>
            </Modal>
        </>
    );
};

export default ModalListPets;
