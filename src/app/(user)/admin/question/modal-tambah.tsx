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
import Switch from "@/components/elements/switch";

const schema = z.object({
    name: z.string().min(1, 'Wajib diisi'),
    description: z.string().min(1, 'Wajib diisi'),
    isPublished: z.boolean().default(false),
});

type Schema = z.infer<typeof schema>

function ModalTambahSurvey({setShowModal, showModal, year}: {
    setShowModal: (value: boolean) => void
    showModal: boolean
    year: string
}) {
    const utils = api.useUtils();

    const {mutate: createFormGroup} = api.admin.formGroup.createFormGroup.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang membuat Survey',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await utils.admin.formGroup.getFormGroupByYear.invalidate(year);
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Survey berhasil disimpan',
                icon: 'success',
                customClass: {container: 'sweet-alerts'},
            });
            setShowModal(false);
        },
    })

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        createFormGroup({...payload, year})
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
                                    <div className="text-lg font-bold">Tambah Survey HEDR Tahun {year}</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>

                                <div className="p-5">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                        <div>
                                            <label htmlFor="nama">Nama Survey<span
                                                className="text-danger">*</span></label>
                                            <input {...register('name')}
                                                   id="nama"
                                                   type="text"
                                                   placeholder="Masukkan nama survey"
                                                   className="form-input mb-2"/>
                                            <ErrorMessage errors={errors} name="name"
                                                          render={({message}) => <DefaultAlertComponent
                                                              type="warning" message={message}/>}/>
                                        </div>
                                        <div>
                                            <label htmlFor="deskripsi">Deskripsi Survey<span
                                                className="text-danger">*</span></label>
                                            <textarea {...register('description')} id="deskripsi"
                                                      placeholder="Masukkan deskripsi survey"
                                                      className="form-textarea min-h-[135px] max-h-[135px] mb-2"/>
                                            <ErrorMessage errors={errors} name="description"
                                                          render={({message}) => <DefaultAlertComponent
                                                              type="warning" message={message}/>}/>
                                        </div>
                                        <div className="flex">
                                            <Controller
                                                control={control}
                                                name="isPublished"
                                                render={({field: {onChange, value}}) => <Switch
                                                    onChange={(value) => onChange(value)} value={value}/>}
                                            />
                                            <span className="ml-2 text-gray-500">*Buka survey saat anda telah membuat list pertanyaan pada Survey ini nanti</span>
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

export default ModalTambahSurvey;
