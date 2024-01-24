import MyImage from "~/Components/atoms/my-image/my-image";
import ravena from "~/assets/images/ravena.jpeg";

import { RadioGroup } from "@headlessui/react";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { BtnPrimary } from "~/Components/atoms/btn";

import type { IPetV2Data } from "~/types/pet-v2";

type CardPetsProps = {
    pet: IPetV2Data;
    checked: boolean;
};

const CardPets = ({ pet, checked }: CardPetsProps) => {
    const { push } = useRouter();

    return (
        <div className="space-y-10 w-full">
            <RadioGroup.Option
                key={pet?.id_pet}
                value={pet}
                className={({ active }) =>
                    cn(
                        "relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none bg-white",
                        {
                            "ring-2 ring-white/20 ring-offset-2": active,
                            "bg-primary-500 bg-opacity-60 text-white": checked,
                        }
                    )
                }
            >
                <>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-around items-center">
                            <MyImage
                                src={ravena}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                className="h-32 w-32 rounded-full"
                            />

                            <div className="flex flex-col items-center">
                                <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                        checked ? "text-white" : "text-gray-900"
                                    }`}
                                >
                                    <h3 className="font-semibold mobile:hidden">
                                        Informações do pet
                                    </h3>
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                        checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                    }`}
                                >
                                    <div className="p-2 max-w-40 ">
                                        <p className="text-gray-700">
                                            <strong>Nome do pet:</strong>{" "}
                                            {pet?.name_pet}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Especie:</strong>{" "}
                                            {pet?.specie}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Sexo:</strong> {pet?.sex}
                                        </p>
                                    </div>
                                </RadioGroup.Description>
                            </div>
                            <div className="flex mobile:hidden flex-col">
                                <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                        checked ? "text-white" : "text-gray-900"
                                    }`}
                                >
                                    <h3 className="font-semibold mobile:hidden">
                                        Informações adicionais
                                    </h3>
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                        checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                    }`}
                                >
                                    <div className="p-2">
                                        <p className="text-gray-700">
                                            <strong>Ano de Nascimento: </strong>
                                            {pet?.date_birth}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Raça: </strong> {pet?.race}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Tipo sanguíneo: </strong>
                                            {pet?.blood_type}
                                        </p>
                                    </div>
                                </RadioGroup.Description>
                            </div>
                        </div>
                        {/* {checked && (
                            <div className="flex justify-end text-white">
                                <ViewAppointment props={pet} />
                            </div>
                        )} */}
                    </div>
                    <div>
                        <BtnPrimary
                            onClick={() =>
                                push(
                                    `/dashboard/update-pet?id_pet=${pet?.id_pet}&document=${pet?.cpf_cnpj}`
                                )
                            }
                            label="Editar"
                            className="mt-2 flex justify-center items-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        />
                    </div>
                </>
            </RadioGroup.Option>
        </div>
    );
};

export default CardPets;
