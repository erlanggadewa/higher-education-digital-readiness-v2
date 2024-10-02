'use client'

import BreadCrumb from "@/components/elements/breadcrumb";
import IconPlus from "@/components/icon/icon-plus";
import IconBarChart from "@/components/icon/icon-bar-chart";
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconSquareRotated from '@/components/icon/icon-square-rotated'
import Tippy from "@tippyjs/react";
import IconPencil from "@/components/icon/icon-pencil";
import IconTrash from "@/components/icon/icon-trash";
import LoadingDotComponent from "@/components/loading/loading-dot";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {api} from '@/trpc/react';
import themeConfig from '@/theme.config';
import {Suspense, useState} from "react";
import ModalTambahLevel from "./modal-tambah";
import ModalEditLevel from "./modal-edit";
import Swal from "sweetalert2";

import 'swiper/css';
import 'swiper/css/pagination';
import 'tippy.js/dist/tippy.css';
import {cn} from "@/utils/cn";

const colors = [
    'danger',
    'warning',
    'primary',
    'info',
    '[#854D0E]'
];

const LevelPage = () => {
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [data] = api.admin.level.getLevelList.useSuspenseQuery();

    const utils = api.useUtils();
    const {mutate: removeLevel} = api.admin.level.removeLevel.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang menghapus level',
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
                text: 'Level berhasil dihapus',
                icon: 'success',
                customClass: {container: 'sweet-alerts'},
            });
        },
        onError() {
            Swal.close();
            void Swal.fire({
                title: 'Gagal!',
                text: 'Level gagal dihapus',
                icon: 'error',
                customClass: {container: 'sweet-alerts'},
            });
        },
    });

    const handleRemove = async (id: string) => {
        const status = await Swal.fire({
            icon: 'warning',
            title: 'Apakah yakin untuk menghapus?',
            text: 'Anda tidak dapat mengurungkan tindakan ini',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
            padding: '2em',
            customClass: {container: 'sweet-alerts'},
        });
        if (!status.isConfirmed) return;
        removeLevel(id);
    }

    return (
        <>
            <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary dark:bg-primary-old"/>
            <div className="flex justify-between">
                <div>
                    <h1 className="mb-2 text-2xl font-bold text-white-light">Level</h1>
                    <BreadCrumb routes={[{label: 'Level'}]}/>
                </div>
                <div>
                    <button onClick={() => setShowModalTambah(true)} type="button"
                            className="btn bg-white dark:bg-[#191e3a] dark:border-[#1b2e4b] dark:shadow-none">
                        <IconPlus/> Tambah Level
                    </button>
                </div>
            </div>
            <div
                className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                    <IconBarChart className="mr-3"/>
                    Daftar Level
                </h3>
                <Suspense fallback={<LoadingDotComponent position="center"/>}>
                    <div className="relative px-16">
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next-ex5',
                                prevEl: '.swiper-button-prev-ex5',
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                            }}
                            style={{position: 'unset'}}
                            dir={themeConfig.rtlClass}
                            key={themeConfig.rtlClass === 'rtl' ? 'true' : 'false'}
                        >
                            {data.map((item, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div
                                            className={cn("w-full shadow max-w-[19rem] rounded border border-white-light bg-white dark:border-[#1b2e4b] dark:bg-[#191e3a] border-b-4", `border-b-${colors[i % (colors.length)]}`)}>
                                            <div
                                                className="px-6 py-4 flex items-center justify-between flex-col h-72 text-center">
                                            <span
                                                className={cn("badge rounded-full", `bg-${colors[i % (colors.length)]}`)}>Level</span>
                                                <div className="w-full">
                                                    <h4 className="text-xl font-bold mb-3">{item.value}</h4>
                                                    <div className="flex justify-between font-semibold">
                                                    <span
                                                        className="text-warning flex"><IconSquareRotated
                                                        className="mr-1"/>Min: {item.minPoint}</span>
                                                        <span className="text-danger flex"><IconSquareRotated
                                                            className="mr-1"/>Max: {item.maxPoint}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Tippy content={`Edit ${item.value}`} theme="primary">
                                                        <button onClick={() => {
                                                            setSelectedId(item.id);
                                                            setShowModalEdit(true);
                                                        }} type="button"
                                                                className="bg-primary p-2 rounded-lg text-white">
                                                            <IconPencil/>
                                                        </button>
                                                    </Tippy>
                                                    <Tippy content={`Remove ${item.value}`} theme="danger">
                                                        <button onClick={() => handleRemove(item.id)} type="button"
                                                                className="bg-danger p-2 rounded-lg text-white">
                                                            <IconTrash/>
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            <button
                                className="swiper-button-prev-ex5 absolute top-[44%] z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:left-2 rtl:right-2">
                                <IconCaretDown className="h-5 w-5 rotate-90 rtl:-rotate-90"/>
                            </button>
                            <button
                                className="swiper-button-next-ex5 absolute top-[44%] z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:right-2 rtl:left-2">
                                <IconCaretDown className="h-5 w-5 -rotate-90 rtl:rotate-90"/>
                            </button>
                        </Swiper>
                    </div>
                </Suspense>
            </div>
            <ModalTambahLevel showModal={showModalTambah} setShowModal={setShowModalTambah}/>
            {!!selectedId &&
                <ModalEditLevel id={selectedId} setShowModal={(value) => setShowModalEdit(value)}
                                showModal={showModalEdit}/>}
        </>
    )
}

export default LevelPage
