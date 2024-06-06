import ModalSearchUberVet from '~/Components/modals/search-uber-vet/search-uber-vet'
import CardVets from '~/Components/organism/card-tutors'

import useListVets from '~/store/hooks/list-vets-by-tutor/use-list-vets'
import useProfile from '~/store/hooks/profile/use-profile'

const VetsTab = () => {
    const { data } = useProfile()
    const { activeData: vets } = useListVets(
        data?.user_information?.cpf_cnpj as string,
    )

    return (
        <>
            {vets?.map((vet) => (
                <CardVets key={vet.cpf_cnpj} tutor={data} />
            ))}

            {!vets?.length && (
                <div className="flex items-center justify-center flex-1 h-40 text-center">
                    <span className="font-sans text-sm text-gray-500">
                        Você ainda não se consultou com nenhum veterinário!
                    </span>
                </div>
            )}

            <ModalSearchUberVet />
        </>
    )
}

export default VetsTab
