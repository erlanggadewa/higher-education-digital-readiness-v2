'use client'

import BreadCrumb from '@/components/elements/breadcrumb';
import IconDatabase from '@/components/icon/icon-database';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import {api} from '@/trpc/react';
import {Suspense, useState} from 'react';
import DataTableAdminQuestion from './data-table';
import BackButton from "@/components/elements/back-button";
import IconPlus from "@/components/icon/icon-plus";
import {useParams} from "next/navigation";
import ModalTambahPertanyaan from "./modal-tambah";

const VariableDetailPage = () => {
    const [showModalTambah, setShowModalTambah] = useState(false)
    const params = useParams<{ formGroupId: string; variableId: string }>()
    const [dataQuestion] = api.admin.question.getQuestion.useSuspenseQuery({
        formGroupId: params.formGroupId,
        variableId: params.variableId,
    });
    return (
        <>
            <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary"/>
            <div className="flex justify-between">
                <div>
                    <div className="flex gap-2 mb-3">
                        <BackButton/>
                        <h1 className="text-2xl font-bold text-white-light">
                            {dataQuestion.variable?.alias} - {dataQuestion.formGroup?.name}
                        </h1>
                    </div>
                    <BreadCrumb routes={[{label: 'Survey', path: '/admin/question'}, {
                        label: 'List Variabel',
                        path: `/admin/question/${params.formGroupId}`
                    }, {label: 'Pertanyaan'}]}/>
                </div>
                <div>
                    <button
                        onClick={() => setShowModalTambah(true)}
                        type="button"
                        className="btn bg-white dark:bg-[#191e3a] dark:border-[#1b2e4b] dark:shadow-none">
                        <IconPlus/> Tambah Pertanyaan
                    </button>
                </div>
            </div>
            <div
                className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                    <IconDatabase className="mr-3"/>
                    Daftar Pertanyaan {dataQuestion.variable?.alias} ({dataQuestion.variable?.name})
                </h3>
                <Suspense fallback={<TableSkeletonComponent/>}>
                    <DataTableAdminQuestion data={dataQuestion ?? []}/>
                </Suspense>
            </div>
            <ModalTambahPertanyaan showModal={showModalTambah} setShowModal={setShowModalTambah}/>
        </>
    );
};

export default VariableDetailPage;
