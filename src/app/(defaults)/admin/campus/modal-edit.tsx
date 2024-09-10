import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import IconRefresh from "@/components/icon/icon-refresh";
import Select from "react-select";
import {ErrorMessage} from "@hookform/error-message";
import DefaultAlertComponent from "@/components/alert/elements-alerts-default";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/utils/id-zod";
import Flatpickr from "react-flatpickr";
import MaskedInput from "react-text-mask";
import {useSelector} from "react-redux";
import type {IRootState} from "@/store";

const optionsAkreditasi = [
    {value: 'Unggul', label: 'Unggul'},
    {value: 'Baik Sekali', label: 'Baik Sekali'},
    {value: 'Baik', label: 'Baik'},
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'C', label: 'C'},
    {value: 'Terakreditasi Sementara', label: 'Terakreditasi Sementara'},
    {value: 'Tidak Terakreditasi', label: 'Tidak Terakreditasi'},
];

const optionsStatus = [
    {value: '1', label: 'Aktif'},
    {value: '0', label: 'Tidak Aktif'},
];

const schema = z.object({
    namaPT: z.string().min(1, 'Wajib diisi'),
    kodePT: z.string().min(1, 'Wajib diisi'),
    emailPT: z.string().email('Email tidak valid').min(1, 'Wajib diisi'),
    passwordPT: z.string().min(1, 'Wajib diisi'),
    logoPT: z.string().url().min(1, 'Wajib diisi'),
    statusPT: z.string().min(1, 'Wajib diisi'),
    akreditasiPT: z.string().min(1, 'Wajib diisi'),
    tanggalBerdiriPT: z.date({
        message: 'Wajib diisi',
    }),
    noSKPT: z.string().min(1, 'Wajib diisi'),
    tanggalSKPT: z.date({
        message: 'Wajib diisi',
    }),
    alamatPT: z.string().min(1, 'Wajib diisi'),
    kotaPT: z.string().min(1, 'Wajib diisi'),
    kodePosPT: z.string().min(1, 'Wajib diisi'),
    teleponPT: z.string().min(1, 'Wajib diisi'),
    faximilePT: z.string().min(1, 'Wajib diisi'),
});

type Schema = z.infer<typeof schema>

function ModalEditKampus({setShowModal, showModal}: { setShowModal: (value: boolean) => void; showModal: boolean }) {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const utils = api.useUtils();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors},
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        await Swal.fire({
            icon: 'warning',
            title: '',
            text: 'Perhatikan kembali hasil review anda',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
            padding: '2em',
            customClass: {container: 'sweet-alerts'},
        });
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
                                className="panel my-8 w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div
                                    className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-dark">
                                    <div className="text-lg font-bold">Edit Kampus</div>
                                    <button type="button" onClick={() => setShowModal(false)} className="">
                                        <IconX/>
                                    </button>
                                </div>

                                <div className="p-5">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="nama">Nama Kampus<span
                                                    className="text-danger">*</span></label>
                                                <input {...register('namaPT')}
                                                       id="nama"
                                                       type="text"
                                                       placeholder="Masukkan nama kampus"
                                                       className="form-input mb-2"/>
                                                <ErrorMessage errors={errors} name="namaPT"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <div>
                                                <label htmlFor="kode">Kode Kampus<span
                                                    className="text-danger">*</span></label>
                                                <input {...register('kodePT')}
                                                       id="kode"
                                                       type="text"
                                                       placeholder="Masukkan kode kampus"
                                                       className="form-input mb-2"/>
                                                <ErrorMessage errors={errors} name="kodePT"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="email">Email Kampus<span
                                                    className="text-danger">*</span></label>
                                                <input {...register('emailPT')}
                                                       id="email"
                                                       type="email"
                                                       placeholder="Masukkan e-mail kampus"
                                                       className="form-input mb-2"/>
                                                <ErrorMessage errors={errors} name="emailPT"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <div>
                                                <label htmlFor="password">Password Kampus<span
                                                    className="text-danger">*</span></label>
                                                <div className="flex gap-2">
                                                    <input id="password" type="text"
                                                           disabled {...register('passwordPT')}
                                                           className="form-input mb-2 disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"/>
                                                    <button type="button"
                                                            onClick={() => setValue('passwordPT', '654321')}
                                                            className="bg-danger rounded-lg p-2 text-white mb-2">
                                                        <IconRefresh/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="image">URL Image Logo Kampus<span
                                                    className="text-danger">*</span></label>
                                                <input {...register('logoPT')} id="image" type="text"
                                                       placeholder="Masukkan url image logo kampus"
                                                       className="form-input mb-2"/>
                                                <ErrorMessage errors={errors} name="logoPT"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="status">Status Kampus<span
                                                        className="text-danger">*</span></label>
                                                    <Select onChange={(e) => e?.value && setValue('statusPT', e.value)}
                                                            id="status"
                                                            options={optionsStatus} className="mb-2"/>
                                                    <ErrorMessage errors={errors} name="statusPT"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="akreditasi">Akreditasi Kampus<span
                                                        className="text-danger">*</span></label>
                                                    <Select
                                                        onChange={(e) => e?.value && setValue('akreditasiPT', e.value)}
                                                        id="akreditasi"
                                                        options={optionsAkreditasi} className="mb-2"/>
                                                    <ErrorMessage errors={errors} name="akreditasiPT"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="noSK">No. SK PT<span
                                                    className="text-danger">*</span></label>
                                                <input {...register('noSKPT')} id="noSK" type="text"
                                                       placeholder="Masukkan nomor SK PT"
                                                       className="form-input mb-2"/>
                                                <ErrorMessage errors={errors} name="noSKPT"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="tanggalBerdiri">Tanggal Berdiri Kampus<span
                                                        className="text-danger">*</span></label>
                                                    <Flatpickr
                                                        onChange={(value) => value[0] && setValue('tanggalBerdiriPT', value[0])}
                                                        id="tanggalBerdiri"
                                                        placeholder="Masukkan tanggal berdiri PT"
                                                        options={{
                                                            dateFormat: 'Y-m-d',
                                                            position: isRtl ? 'auto right' : 'auto left'
                                                        }}
                                                        className="form-input mb-2"/>
                                                    <ErrorMessage errors={errors} name="tanggalBerdiriPT"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="tanggalSK">Tanggal SK PT<span
                                                        className="text-danger">*</span></label>
                                                    <Flatpickr
                                                        onChange={(value) => value[0] && setValue('tanggalSKPT', value[0])}
                                                        id="tanggalSK"
                                                        placeholder="Masukkan tanggal SK PT"
                                                        options={{
                                                            dateFormat: 'Y-m-d',
                                                            position: isRtl ? 'auto right' : 'auto left'
                                                        }}
                                                        className="form-input mb-2"/>
                                                    <ErrorMessage errors={errors} name="tanggalSKPT"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="address">Alamat Kampus<span
                                                    className="text-danger">*</span></label>
                                                <textarea {...register('alamatPT')} id="address"
                                                          placeholder="Masukkan alamat kampus"
                                                          className="form-textarea min-h-[113px] max-h-[113px]"/>
                                                <ErrorMessage errors={errors} name="alamatPT"
                                                              render={({message}) => <DefaultAlertComponent
                                                                  type="warning" message={message}/>}/>
                                            </div>
                                            <div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="kota">Kota Kampus<span
                                                            className="text-danger">*</span></label>
                                                        <input {...register('kotaPT')} id="kota" type="text"
                                                               placeholder="Masukkan kota kampus"
                                                               className="form-input mb-2"/>
                                                        <ErrorMessage errors={errors} name="kotaPT"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="kodePos">Kode Pos Kampus<span
                                                            className="text-danger">*</span></label>
                                                        <MaskedInput
                                                            onChange={(e) => setValue('kodePosPT', e.target.value)}
                                                            id="telepon"
                                                            type="text"
                                                            placeholder="Masukkan kode pos kampus"
                                                            className="form-input mb-2"
                                                            mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                        />
                                                        <ErrorMessage errors={errors} name="kodePosPT"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="telepon">No. Telepon<span
                                                            className="text-danger">*</span></label>
                                                        <MaskedInput
                                                            onChange={(e) => setValue('teleponPT', e.target.value)}
                                                            id="telepon"
                                                            type="text"
                                                            placeholder="(021) ___-___-___"
                                                            className="form-input mb-2"
                                                            mask={(value) => {
                                                                const rule = ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
                                                                if (value.length > 17) rule.push(/[0-9]/);
                                                                return rule
                                                            }}
                                                        />
                                                        <ErrorMessage errors={errors} name="teleponPT"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="fax">No. Faximile<span
                                                            className="text-danger">*</span></label>
                                                        <MaskedInput
                                                            onChange={(e) => setValue('faximilePT', e.target.value)}
                                                            id="telepon"
                                                            type="text"
                                                            placeholder="(021) ___-___-___"
                                                            className="form-input mb-2"
                                                            mask={(value) => {
                                                                const rule = ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
                                                                if (value.length > 17) rule.push(/[0-9]/);
                                                                return rule
                                                            }}
                                                        />
                                                        <ErrorMessage errors={errors} name="faximilePT"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </div>
                                                </div>
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

export default ModalEditKampus;
