import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import {ErrorMessage} from "@hookform/error-message";
import DefaultAlertComponent from "@/components/alert/elements-alerts-default";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/utils/id-zod";
import TouchSpin from "@/components/elements/touch-spin";
import LoadingDotComponent from "@/components/loading/loading-dot";
import {useParams} from "next/navigation";

const schema = z.object({
    deskripsi: z.string().min(1, 'Wajib diisi'),
});

type Schema = z.infer<typeof schema>

function ModalEditVariableLevel({setShowModal, showModal, id}: {
    setShowModal: (value: boolean) => void
    showModal: boolean
    id: string
}) {
    const params = useParams<{
        variableId: string;
    }>();
    const {data, isLoading} = api.admin.variable.getLevelDetailById.useQuery({
        levelId: id,
        variableId: params.variableId
    });
    const utils = api.useUtils();

    const {mutate: updateLevelDescription} = api.admin.variable.updateLevelDescription.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang mengedit Deskripsi Level',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await Promise.all([
                utils.admin.variable.getLevelByVariableId.invalidate(params.variableId),
                utils.admin.variable.getLevelDetailById.invalidate({levelId: id, variableId: params.variableId}),
            ])
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Deskripsi Level berhasil diedit',
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
        formState: {errors}
    } = useForm<Schema>({
        resolver: zodResolver(schema),
        values: {
            deskripsi: data?.levelVariable?.descriptionLevelVariable ?? '',
        }
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        updateLevelDescription({
            id: data?.levelVariable?.id ?? null,
            levelId: id,
            variableId: params.variableId,
            description: payload.deskripsi,
        })
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
                                    <div className="text-lg font-bold">Edit Level</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>

                                <div className="p-5">
                                    {data && !isLoading ?
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                            <div>
                                                <label
                                                    htmlFor="nama">Level {data?.variable?.alias} - {data?.variable?.name}</label>
                                                <input
                                                    id="nama"
                                                    type="text"
                                                    className="form-input disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed mb-2"
                                                    value={data?.level?.value} disabled/>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="minPoint">Min Poin</label>
                                                    <TouchSpin id="minPoint" disabled value={data?.level?.minPoint}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="maxPoint">Max Poin</label>
                                                    <TouchSpin id="maxPoint" disabled value={data?.level?.maxPoint}/>
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="deskripsi">Deskripsi {data?.variable?.alias} - {data?.variable?.name}<span
                                                    className="text-danger">*</span></label>
                                                <textarea {...register('deskripsi')} id="deskripsi"
                                                          placeholder="Masukkan deskripsi level"
                                                          className="form-textarea min-h-[135px] max-h-[135px] mb-2"/>
                                                <ErrorMessage errors={errors} name="deskripsi"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Edit
                                            </button>
                                        </form> : <LoadingDotComponent position={"center"}/>}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ModalEditVariableLevel;
