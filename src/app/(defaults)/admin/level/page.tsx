'use client'

import BreadCrumb from "@/components/elements/breadcrumb";
import IconPlus from "@/components/icon/icon-plus";
import IconBarChart from "@/components/icon/icon-bar-chart";
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconSquareRotated from '@/components/icon/icon-square-rotated'
import Tippy from "@tippyjs/react";
import IconPencil from "@/components/icon/icon-pencil";
import IconTrash from "@/components/icon/icon-trash";
import IconEye from "@/components/icon/icon-eye";
import LoadingDotComponent from "@/components/loading/loading-dot";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {api} from '@/trpc/react';
import themeConfig from '@/theme.config';

import 'swiper/css';
import 'swiper/css/pagination';
import 'tippy.js/dist/tippy.css';

const LevelPage = () => {
    const {data: listLevel, isLoading} = api.admin.level.getLevelList.useQuery();
    return (
        <>
            <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary"/>
            <div className="flex justify-between">
                <div>
                    <h1 className="mb-2 text-2xl font-bold text-white-light">Level</h1>
                    <BreadCrumb routes={[{label: 'Level'}]}/>
                </div>
                <div>
                    <button type="button"
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
                        {!isLoading && listLevel?.length ? listLevel.map((item, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <div
                                        className="w-full max-w-[19rem] rounded border border-white-light bg-white dark:border-[#1b2e4b] dark:bg-[#191e3a]">
                                        <div
                                            className="px-6 py-4 flex items-center justify-between flex-col h-72 text-center">
                                            <span
                                                className="badge bg-secondary rounded-full">Level</span>
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
                                                    <button type="button"
                                                            className="bg-warning p-2 rounded-lg text-white">
                                                        <IconPencil/>
                                                    </button>
                                                </Tippy>
                                                <Tippy content={`Detail ${item.value}`} theme="primary">
                                                    <button type="button"
                                                            className="bg-info p-2 rounded-lg text-white">
                                                        <IconEye/>
                                                    </button>
                                                </Tippy>
                                                <Tippy content={`Remove ${item.value}`} theme="primary">
                                                    <button type="button"
                                                            className="bg-danger p-2 rounded-lg text-white">
                                                        <IconTrash/>
                                                    </button>
                                                </Tippy>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        }) : isLoading ?
                            <LoadingDotComponent position='center'/> : 'Data tidak ditemukan'}
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
            </div>
        </>
    )
}

export default LevelPage
