'use client'

import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import {ErrorMessage} from "@hookform/error-message";
import DefaultAlertComponent from "@/components/alert/elements-alerts-default";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/utils/id-zod";
import LoadingDotComponent from "@/components/loading/loading-dot";

const schema = z.object({
    nama: z.string().min(1, 'Wajib diisi'),
    alias: z.string().min(1, 'Wajib diisi'),
    deskripsi: z.string().min(1, 'Wajib diisi'),
});

type Schema = z.infer<typeof schema>

function ModalEditVariabel({setShowModal, showModal, id}: {
    setShowModal: (value: boolean) => void;
    showModal: boolean,
    id: string
}) {
    const {data, isLoading} = api.admin.variable.getDetailVariable.useQuery(id);
    const utils = api.useUtils();

    const {mutate: updateVariable} = api.admin.variable.updateVariable.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang mengedit variabel',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await Promise.all([
                utils.admin.variable.getListVariable.invalidate(),
                utils.admin.variable.getDetailVariable.invalidate(id)
            ])
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Variabel berhasil diedit',
                icon: 'success',
                customClass: {container: 'sweet-alerts'},
            });
            setShowModal(false);
        },
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Schema>({
        resolver: zodResolver(schema),
        values: {
            alias: data?.alias ?? '',
            deskripsi: data?.description ?? '',
            nama: data?.name ?? '',
        },
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        updateVariable({...payload, id});
    };

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" open={showModal} onClose={() => setShowModal(true)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0"
                                  enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                    <div className="fixed inset-0"/>
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="panel my-8 w-full max-w-2xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div
                                    className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-dark">
                                    <div className="text-lg font-bold">Edit Variabel</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>
                                <div className="p-5">
                                    {!!data && !isLoading ?
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="nama">Nama Variabel<span
                                                        className="text-danger">*</span></label>
                                                    <input {...register('nama')}
                                                           id="nama"
                                                           type="text"
                                                           placeholder="Masukkan nama variabel"
                                                           className="form-input mb-2"/>
                                                    <ErrorMessage errors={errors} name="nama"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="alias">Inisial Variabel<span
                                                        className="text-danger">*</span></label>
                                                    <input {...register('alias')}
                                                           id="alias"
                                                           type="text"
                                                           placeholder="Masukkan inisial variabel"
                                                           className="form-input mb-2"/>
                                                    <ErrorMessage errors={errors} name="alias"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="deskripsi">Deskripsi Variabel<span
                                                    className="text-danger">*</span></label>
                                                <textarea {...register('deskripsi')} id="deskripsi"
                                                          placeholder="Masukkan deskripsi variabel"
                                                          className="form-textarea min-h-[135px] max-h-[135px]"/>
                                                <ErrorMessage errors={errors} name="deskripsi"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Edit
                                            </button>
                                        </form>
                                        : <LoadingDotComponent position={"center"}/>}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ModalEditVariabel;
