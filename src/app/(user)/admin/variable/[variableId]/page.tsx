'use client'

import BackButton from "@/components/elements/back-button";
import BreadCrumb from "@/components/elements/breadcrumb";
import {api} from "@/trpc/react";
import {useParams} from "next/navigation";
import IconSquareRotated from "@/components/icon/icon-square-rotated";
import Tippy from "@tippyjs/react";
import IconPencil from "@/components/icon/icon-pencil";
import LoadingDotComponent from "@/components/loading/loading-dot";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import themeConfig from "@/theme.config";
import IconCaretDown from "@/components/icon/icon-caret-down";
import {Suspense, useState} from "react";
import ModalEditVariableLevel from "./modal-edit";
import {cn} from "@/utils/cn";

import 'swiper/css';
import 'swiper/css/pagination';
import 'tippy.js/dist/tippy.css';

const colors = [
    'danger',
    'warning',
    'primary',
    'info',
    '[#854D0E]'
];

const VariableLevelPage = () => {
    const params = useParams<{
        variableId: string;
    }>();
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [data] = api.admin.variable.getLevelByVariableId.useSuspenseQuery(params.variableId);

    return (
        <>
            <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary"/>
            <div className="flex justify-between">
                <div>
                    <div className="flex gap-2 mb-3">
                        <BackButton/>
                        <h1 className="text-2xl font-bold text-white-light">Level {data?.variable?.name} ({data?.variable?.alias})</h1>
                    </div>
                    <BreadCrumb routes={[{label: 'Variabel', path: '/admin/variable'}, {label: 'Level'}]}/>
                </div>
            </div>
            <div
                className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                    {data?.level.length} Level
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
                            {data?.level.map((item, i) => {
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
            {selectedId &&
                <ModalEditVariableLevel setShowModal={setShowModalEdit} showModal={showModalEdit} id={selectedId}/>}
        </>
    );
};

export default VariableLevelPage;
