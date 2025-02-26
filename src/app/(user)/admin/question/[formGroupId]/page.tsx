'use client'

import BreadCrumb from "@/components/elements/breadcrumb";
import {Suspense} from "react";
import TableSkeletonComponent from "@/components/loading/table-skeleton";
import IconDatabase from "@/components/icon/icon-database";
import DataTableAdminVariable from "./data-table";
import {api} from '@/trpc/react';
import BackButton from "@/components/elements/back-button";
import {useParams} from "next/navigation";

const FormGroupDetailPage = () => {
    const {formGroupId} = useParams<{ formGroupId: string }>()
    const [dataFormGroup] = api.admin.formGroup.getFormGroupById.useSuspenseQuery(formGroupId);
    return (
        <>
            <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary"/>
            <div className="flex justify-between">
                <div>
                    <div className="flex gap-2 mb-3">
                        <BackButton/>
                        <h1 className="text-2xl font-bold text-white-light">{dataFormGroup?.formGroupName}</h1>
                    </div>
                    <BreadCrumb routes={[{label: 'Survey', path: '/admin/question'}, {label: 'List Variabel'}]}/>
                </div>
            </div>
            <div
                className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                    <IconDatabase className="mr-3"/>
                    Daftar Variabel {dataFormGroup?.formGroupName}
                    <span className="ml-2 badge bg-primary rounded-full">{dataFormGroup?.year}</span>
                </h3>
                <Suspense fallback={<TableSkeletonComponent/>}>
                    <DataTableAdminVariable
                        data={dataFormGroup}/>
                </Suspense>
            </div>
        </>
    );
}

export default FormGroupDetailPage;
