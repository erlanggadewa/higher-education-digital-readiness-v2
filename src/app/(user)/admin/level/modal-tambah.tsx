import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {useForm, type SubmitHandler, Controller} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import {ErrorMessage} from "@hookform/error-message";
import DefaultAlertComponent from "@/components/alert/elements-alerts-default";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/utils/id-zod";
import TouchSpin from "@/components/elements/touch-spin";

const schema = z.object({
    nama: z.string().min(1, 'Wajib diisi'),
    deskripsi: z.string().min(1, 'Wajib diisi'),
    minPoint: z.number().min(0, 'Minimal 0'),
    maxPoint: z.number().min(0, 'Minimal 0'),
});

type Schema = z.infer<typeof schema>

function ModalTambahLevel({setShowModal, showModal}: {
    setShowModal: (value: boolean) => void;
    showModal: boolean
}) {
    const utils = api.useUtils();

    const {mutate: createLevel} = api.admin.level.createLevel.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang membuat level',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await utils.admin.level.getLevelList.invalidate();
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Level berhasil disimpan',
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
        control,
        formState: {errors}
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        createLevel(payload);
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
                                className="panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div
                                    className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-dark">
                                    <div className="text-lg font-bold">Tambah Level</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>

                                <div className="p-5">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                        <div>
                                            <label htmlFor="nama">Nama Level<span
                                                className="text-danger">*</span></label>
                                            <input {...register('nama')}
                                                   id="nama"
                                                   type="text"
                                                   placeholder="Masukkan nama level"
                                                   className="form-input mb-2"/>
                                            <ErrorMessage errors={errors} name="nama"
                                                          render={({message}) => <DefaultAlertComponent
                                                              type="warning" message={message}/>}/>
                                        </div>
                                        <div>
                                            <label htmlFor="deskripsi">Deskripsi Level<span
                                                className="text-danger">*</span></label>
                                            <textarea {...register('deskripsi')} id="deskripsi"
                                                      placeholder="Masukkan deskripsi level"
                                                      className="form-textarea min-h-[135px] max-h-[135px] mb-2"/>
                                            <ErrorMessage errors={errors} name="deskripsi"
                                                          render={({message}) => <DefaultAlertComponent
                                                              type="warning" message={message}/>}/>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <Controller
                                                    control={control}
                                                    name="minPoint"
                                                    render={({field: {onChange}}) => <>
                                                        <label htmlFor="minPoint">Min Poin</label>
                                                        <TouchSpin id="minPoint" onChange={(value) => onChange(value)}/>
                                                        <ErrorMessage errors={errors} name="minPoint"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </>}
                                                />
                                            </div>
                                            <div>
                                                <Controller
                                                    control={control}
                                                    name="maxPoint"
                                                    render={({field: {onChange}}) => <>
                                                        <label htmlFor="maxPoint">Min Poin</label>
                                                        <TouchSpin id="maxPoint" onChange={(value) => onChange(value)}/>
                                                        <ErrorMessage errors={errors} name="maxPoint"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </>}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Tambah
                                        </button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ModalTambahLevel;
