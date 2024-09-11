import IconX from '@/components/icon/icon-x';
import {api} from '@/trpc/react';
import {Dialog, Transition} from '@headlessui/react';
import {Controller, type SubmitHandler, useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {Fragment, useEffect} from 'react';
import Select from "react-select";
import {ErrorMessage} from "@hookform/error-message";
import DefaultAlertComponent from "@/components/alert/elements-alerts-default";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "@/utils/id-zod";
import Flatpickr from "react-flatpickr";
import MaskedInput from "react-text-mask";
import {useSelector} from "react-redux";
import {type IRootState} from "@/store";
import LoadingDotComponent from "@/components/loading/loading-dot";

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

function ModalEditKampus({setShowModal, showModal, id}: {
    setShowModal: (value: boolean) => void;
    showModal: boolean,
    id: string
}) {
    const {data, isLoading} = api.admin.campus.getDetailCampus.useQuery(id);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const utils = api.useUtils();

    const {mutate: updateUserCampus} = api.admin.campus.updateCampus.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang mengedit user kampus',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await utils.admin.campus.getListCampus.invalidate();
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'User kampus berhasil diedit',
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
        formState: {errors},
    } = useForm<Schema>({
        resolver: zodResolver(schema),
        values: {
            namaPT: data?.name ?? '',
            kodePT: data?.campus?.codePt ?? '',
            emailPT: data?.email ?? '',
            logoPT: data?.image ?? '',
            statusPT: data?.campus?.statusPt ? '1' : '0',
            akreditasiPT: data?.campus?.accreditationPt ?? '',
            tanggalBerdiriPT: new Date(data?.campus?.standingDate ?? ''),
            noSKPT: data?.campus?.numberSkPt ?? '',
            tanggalSKPT: new Date(data?.campus?.dateSkPt ?? ''),
            alamatPT: data?.campus?.address ?? '',
            kotaPT: data?.campus?.city ?? '',
            kodePosPT: data?.campus?.postalCode ?? '',
            teleponPT: data?.campus?.phoneNumber ?? '',
            faximilePT: data?.campus?.faximile ?? '',
        }
    });

    useEffect(() => {
        reset();
    }, [showModal]);

    const onSubmit: SubmitHandler<Schema> = async (payload) => {
        updateUserCampus({
            ...payload,
            id,
            teleponPT: payload.teleponPT.replace('_', ''),
            faximilePT: payload.teleponPT.replace('_', ''),
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
                                    {data && !isLoading ?
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
                                                    <input id="password" type="password"
                                                           disabled value="12345678"
                                                           className="form-input mb-2 disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"/>
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
                                                        <Controller
                                                            control={control}
                                                            name="statusPT"
                                                            render={({field: {onChange, value}}) => <>
                                                                <label htmlFor="status">Status
                                                                    Kampus<span
                                                                        className="text-danger">*</span></label>
                                                                <Select
                                                                    value={optionsStatus.find((option) => option.value === value)}
                                                                    onChange={(e) => e?.value && onChange(e.value)}
                                                                    id="status"
                                                                    options={optionsStatus} className="mb-2"/>
                                                            </>}
                                                        />
                                                        <ErrorMessage errors={errors} name="statusPT"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </div>
                                                    <div>
                                                        <Controller
                                                            control={control}
                                                            name="akreditasiPT"
                                                            render={({field: {onChange, value}}) => <>
                                                                <label htmlFor="akreditasi">Akreditasi Kampus<span
                                                                    className="text-danger">*</span></label>
                                                                <Select
                                                                    value={optionsAkreditasi.find((option) => option.value === value)}
                                                                    onChange={(e) => e?.value && onChange(e.value)}
                                                                    id="akreditasi"
                                                                    options={optionsAkreditasi} className="mb-2"/>
                                                            </>}
                                                        />
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
                                                        <Controller
                                                            control={control}
                                                            name="tanggalBerdiriPT"
                                                            render={({field: {onChange, value}}) => <>
                                                                <label htmlFor="tanggalBerdiri">Tanggal Berdiri
                                                                    Kampus<span
                                                                        className="text-danger">*</span></label>
                                                                <Flatpickr
                                                                    value={value}
                                                                    onChange={(value) => value[0] && onChange(value[0])}
                                                                    id="tanggalBerdiri"
                                                                    placeholder="Masukkan tanggal berdiri PT"
                                                                    options={{
                                                                        dateFormat: 'Y-m-d',
                                                                        position: isRtl ? 'auto right' : 'auto left'
                                                                    }}
                                                                    className="form-input mb-2"/>
                                                            </>}
                                                        />
                                                        <ErrorMessage errors={errors} name="tanggalBerdiriPT"
                                                                      render={({message}) => <DefaultAlertComponent
                                                                          type="warning" message={message}/>}/>
                                                    </div>
                                                    <div>
                                                        <Controller
                                                            control={control}
                                                            name="tanggalSKPT"
                                                            render={({field: {onChange, value}}) => <>
                                                                <label htmlFor="tanggalSK">Tanggal SK PT<span
                                                                    className="text-danger">*</span></label>
                                                                <Flatpickr
                                                                    value={value}
                                                                    onChange={(value) => value[0] && onChange(value[0])}
                                                                    id="tanggalSK"
                                                                    placeholder="Masukkan tanggal SK PT"
                                                                    options={{
                                                                        dateFormat: 'Y-m-d',
                                                                        position: isRtl ? 'auto right' : 'auto left'
                                                                    }}
                                                                    className="form-input mb-2"/>
                                                            </>}
                                                        />
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
                                                              className="form-textarea min-h-[133px] max-h-[133px]"/>
                                                    <ErrorMessage errors={errors} name="alamatPT"
                                                                  render={({message}) => <DefaultAlertComponent
                                                                      type="warning" message={message}/>}/>
                                                </div>
                                                <div className="flex flex-col gap-5">
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
                                                            <Controller
                                                                control={control}
                                                                name="kodePosPT"
                                                                render={({field: {onChange, value}}) => <>
                                                                    <label htmlFor="kodePos">Kode Pos Kampus<span
                                                                        className="text-danger">*</span></label>
                                                                    <MaskedInput
                                                                        value={value}
                                                                        onChange={(e) => onChange(e.target.value)}
                                                                        id="telepon"
                                                                        type="text"
                                                                        placeholder="Masukkan kode pos kampus"
                                                                        className="form-input mb-2"
                                                                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                                    />
                                                                </>}
                                                            />
                                                            <ErrorMessage errors={errors} name="kodePosPT"
                                                                          render={({message}) => <DefaultAlertComponent
                                                                              type="warning" message={message}/>}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <Controller
                                                                control={control}
                                                                name="teleponPT"
                                                                render={({field: {onChange, value}}) => <>
                                                                    <label htmlFor="telepon">No. Telepon<span
                                                                        className="text-danger">*</span></label>
                                                                    <MaskedInput
                                                                        value={value}
                                                                        onChange={(e) => onChange(e.target.value)}
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
                                                                </>}
                                                            />
                                                            <ErrorMessage errors={errors} name="teleponPT"
                                                                          render={({message}) => <DefaultAlertComponent
                                                                              type="warning" message={message}/>}/>
                                                        </div>
                                                        <div>
                                                            <Controller
                                                                control={control}
                                                                name="faximilePT"
                                                                render={({field: {onChange, value}}) => <>
                                                                    <label htmlFor="fax">No. Faximile<span
                                                                        className="text-danger">*</span></label>
                                                                    <MaskedInput
                                                                        value={value}
                                                                        onChange={(e) => onChange(e.target.value)}
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
                                                                </>}
                                                            />
                                                            <ErrorMessage errors={errors} name="faximilePT"
                                                                          render={({message}) => <DefaultAlertComponent
                                                                              type="warning" message={message}/>}/>
                                                        </div>
                                                    </div>
                                                </div>
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

export default ModalEditKampus;
