import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {useForm, type SubmitHandler, useFieldArray, Controller} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import {ErrorMessage} from "@hookform/error-message";
import DefaultAlertComponent from "@/components/alert/elements-alerts-default";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/utils/id-zod";
import QuestionOption from "@/components/elements/question-option";
import TouchSpin from "@/components/elements/touch-spin";
import IconTrash from "@/components/icon/icon-trash";
import Tippy from "@tippyjs/react";
import LoadingDotComponent from "@/components/loading/loading-dot";

const schema = z.object({
    question: z.string().min(1, 'Wajib diisi'),
    options: z.array(z.object({
        option: z.string().min(1, 'Wajib diisi'),
        point: z.number().default(0),
    })).min(2, 'Minimal 2 opsi jawaban')
});

type Schema = z.infer<typeof schema>

function ModalEditPertanyaan({setShowModal, showModal, id}: {
    setShowModal: (value: boolean) => void
    showModal: boolean
    id: string
}) {
    const {data, isLoading} = api.admin.question.getQuestionDetail.useQuery(id);
    const utils = api.useUtils();

    const {mutate: updateQuestion} = api.admin.question.updateQuestion.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang mengedit pertanyaan',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await Promise.all([
                utils.admin.question.getQuestionDetail.invalidate(id),
                utils.admin.question.getQuestion.invalidate()
            ]);
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Pertanyaan berhasil diedit',
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
        defaultValues: {
            question: '',
            options: [{option: '', point: 0}, {option: '', point: 0}],
        },
        values: {
            question: data?.question ?? '',
            options: data?.option.map((item) => ({
                option: item.value,
                point: item.point
            })) ?? [{option: '', point: 0}, {option: '', point: 0}],
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "options",
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        updateQuestion({id, ...payload});
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
                                    <div className="text-lg font-bold">Edit Pertanyaan</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>

                                <div className="p-5">
                                    {!!data && !isLoading ?
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                            <div>
                                                <label htmlFor="question">Pertanyaan<span
                                                    className="text-danger">*</span></label>
                                                <input {...register('question')}
                                                       id="question"
                                                       type="text"
                                                       placeholder="Masukkan pertanyaan"
                                                       className="form-input mb-2"/>
                                                <ErrorMessage errors={errors} name="question"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <div>
                                                <label htmlFor="question">Opsi & Bobot Poin Jawaban<span
                                                    className="text-danger">*</span></label>

                                                <div className="flex gap-2 flex-col">
                                                    {fields.map((field, index) => (
                                                        <>
                                                            <div key={`option-${field.id}`}
                                                                 className="flex items-center gap-2">
                                                                <Controller
                                                                    control={control}
                                                                    name={`options.${index}.option`}
                                                                    render={({field: {onChange, value}}) =>
                                                                        <QuestionOption
                                                                            onChange={onChange}
                                                                            value={value}
                                                                            placeholder="Masukkan opsi jawaban"/>}/>
                                                                <Controller
                                                                    control={control}
                                                                    name={`options.${index}.point`}
                                                                    render={({field: {onChange, value}}) =>
                                                                        <TouchSpin value={value}
                                                                                   onChange={onChange}/>}/>
                                                                {index >= 2 ?
                                                                    <Tippy content="Remove option" theme="danger">
                                                                        <button onClick={() => remove(index)}
                                                                                type="button"
                                                                                className="bg-danger p-2 rounded-lg text-white">
                                                                            <IconTrash/>
                                                                        </button>
                                                                    </Tippy> : <button type="button"
                                                                                       className="btn p-4 border-none shadow-none ml-1 cursor-default"/>}
                                                            </div>
                                                            <ErrorMessage errors={errors}
                                                                          name={`options.${index}.option`}
                                                                          render={({message}) => <DefaultAlertComponent
                                                                              type="warning" message={message}/>}/>
                                                        </>
                                                    ))}
                                                </div>

                                                <button onClick={() => append({option: '', point: 0})} type="button"
                                                        className="mt-3 font-semibold text-primary hover:underline group">
                                                    + Tambah opsi jawaban lainnya
                                                </button>

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

export default ModalEditPertanyaan;
