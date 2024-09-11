import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import Tippy from "@tippyjs/react";
import IconRefresh from "@/components/icon/icon-refresh";
import {zodResolver} from "@hookform/resolvers/zod";
import {generatePassword} from "@/utils/password-utils";
import {z} from "@/utils/id-zod";

const schema = z.object({
    password: z.string().min(1, 'Wajib diisi'),
});

type Schema = z.infer<typeof schema>

function ModalUbahPasswordKampus({setShowModal, showModal, id}: {
    setShowModal: (value: boolean) => void;
    showModal: boolean,
    id: string
}) {
    const {mutate: resetPassword} = api.admin.campus.resetPassword.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang mengedit password kampus',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Password kampus berhasil diedit',
                icon: 'success',
                customClass: {container: 'sweet-alerts'},
            });
            setShowModal(false);
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        reset,
    } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: generatePassword(),
        },
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        resetPassword({id, ...payload});
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
                    <div className="flex min-h-screen items-center justify-center px-4">
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
                                className="panel my-8 w-full max-w-md overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div
                                    className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-dark">
                                    <div className="text-lg font-bold">Edit Password</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>

                                <div className="p-5">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                        <div>
                                            <label htmlFor="password">Password Kampus<span
                                                className="text-danger">*</span></label>
                                            <div className="flex gap-2">
                                                <input id="password" type="text"
                                                       disabled {...register('password')}
                                                       className="form-input mb-2 disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"/>
                                                <Tippy content='Generate Password' theme="danger">
                                                    <button type="button"
                                                            onClick={() => setValue('password', generatePassword())}
                                                            className="bg-danger rounded-lg p-2 text-white mb-2">
                                                        <IconRefresh/>
                                                    </button>
                                                </Tippy>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Edit
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

export default ModalUbahPasswordKampus;
