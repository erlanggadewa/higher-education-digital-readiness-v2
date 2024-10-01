'use client';

import BreadCrumb from '@/components/elements/breadcrumb';
import {Suspense, useState} from 'react';
import DataTableAdminCampus from './data-table';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import IconPlus from '@/components/icon/icon-plus';
import IconUniversity from '@/components/icon/icon-university';
import ModalTambahKampus from "./modal-tambah";

const CampusPage = () => {
    const [showModalTambah, setShowModalTambah] = useState(false);

    return (
        <>
            <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary"/>
            <div className="flex justify-between">
                <div>
                    <h1 className="mb-2 text-2xl font-bold text-white-light">Kampus</h1>
                    <BreadCrumb routes={[{label: 'Kampus'}]}/>
                </div>
                <div>
                    <button onClick={() => setShowModalTambah(true)} type="button"
                            className="btn bg-white dark:text-white-light dark:bg-[#191e3a] dark:border-[#1b2e4b] dark:shadow-none">
                        <IconPlus/> Tambah Kampus
                    </button>
                </div>
            </div>
            <div
                className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                    <IconUniversity className="mr-3"/>
                    Daftar Kampus
                </h3>
                <Suspense fallback={<TableSkeletonComponent/>}>
                    <DataTableAdminCampus/>
                </Suspense>
            </div>
            <ModalTambahKampus setShowModal={setShowModalTambah} showModal={showModalTambah}/>
        </>
    );
};

export default CampusPage;
