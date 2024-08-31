import { XMarkIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa'
import HeaderTitle from '~/Components/atoms/header-title'
import FieldControl from '~/Components/molecules/field-control'
import { encodeBase64 } from '~/utils/encode-base-64'

type SubmitValues = {
    search: string
}

const Search = () => {
    const router = useRouter()

    const handleSubmit = (values: SubmitValues) => {
        if (!values.search) return

        const encodeSearch = encodeBase64(values.search)
        router.push(`/pet-was-verify/${encodeSearch}`)
    }

    return (
        <div className="flex flex-col min-h-screen auth-bg-cover">
            <HeaderTitle title="Busca" />
            <div className="bg-overlay" />
            <main
                className={cn(
                    'flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden',
                )}
            >
                <section className="flex justify-start w-full p-4 web:flex-row mobile:flex-col ">
                    <div
                        className={cn(
                            `
                                
                               flex flex-1 w-full items-center justify-center
                               flex-col gap-4 z-10
                            `,
                        )}
                    >
                        <div
                            className="flex h-40 mobile:h-36 w-full !bg-contain !bg-no-repeat !bg-center"
                            style={{
                                background: 'url(/logo-default-white-3.webp)',
                            }}
                        />
                        <Formik
                            initialValues={{ search: '' }}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, values, setFieldValue }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col items-center justify-center w-1/2 gap-4 "
                                >
                                    <FieldControl
                                        ctx={values}
                                        name="search"
                                        label="Pesquisar"
                                        className="w-full rounded-full shadow-lg mobile:overflow-visible"
                                        startIcon={
                                            <FaSearch className="text-gray-400" />
                                        }
                                        endIcon={
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFieldValue('search', '')
                                                }
                                                className="flex items-center justify-center"
                                            >
                                                <XMarkIcon className="w-6 h-6 text-red-300" />
                                            </button>
                                        }
                                    />
                                    <button
                                        style={{
                                            background: '#f6dda3',
                                            opacity: 0.9,
                                        }}
                                        type="submit"
                                        className="flex items-center justify-center w-40 h-10 font-sans font-semibold text-gray-500 !bg-opacity-50 rounded-full shadow-lg hover:text-gray-600 hover:!bg-opacity-100"
                                    >
                                        Pesquisa Pawkeepr
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Search
