'use client';

import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import IconPencil from '@/components/icon/icon-pencil';
import {type IRootState} from '@/store';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import {DataTable, type DataTableSortStatus} from 'mantine-datatable';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import 'tippy.js/dist/tippy.css';
import ExportFileComponent from "@/components/export/export-file";
import HighlightField from "@/components/highlight/highlight";

function DataTableAdminQuestion({data: rowData}: { data: any[] }) {
    console.log(rowData)
    const cols: { accessor: string; title: string }[] = [
        {accessor: 'question', title: 'Pertanyaan'},
        {accessor: 'option', title: 'Opsi dan Bobot Jawaban'},
    ];
    const colsExport: { accessor: string; title: string }[] = [
        {accessor: 'question', title: 'Pertanyaan'},
        {accessor: 'optionJoin', title: 'Opsi dan Bobot Jawaban'},
    ];

    // show/hide
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(10);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<string[]>([]);

    const showHideColumns = (col: string, _value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    useEffect(() => {
        setInitialRecords(sortBy(rowData, 'name'));
    }, [rowData]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (!rowData) return;
        setInitialRecords(() => {
            return rowData.filter((item) => {
                // * Ubah dan custom untuk pencarian di sini
                return true
                // return item.name.toLowerCase().includes(search.toLowerCase()) || item.totalQuestion.toString().includes(search.toLowerCase()) || item.alias.toLowerCase().includes(search.toLowerCase()) || item.updatedAt.toLocaleString().includes(search.toLowerCase());
            });
        });

        // * tambah state yang digunakan untuk search di sini
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    return (
        <div>
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <ExportFileComponent cols={colsExport} rowData={initialRecords}/>

                <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                    <DropdownHideColumn isRtl={isRtl} cols={cols} hideCols={hideCols} setHideCols={setHideCols}
                                        showHideColumns={showHideColumns}/>
                    <div className="text-right xl:min-w-96">
                        <input type="text" className="form-input ring dark:ring-gray-400" placeholder="Search..."
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    idAccessor="id"
                    className="table-hover whitespace-nowrap rounded-md"
                    records={recordsData}
                    columns={[
                        {
                            accessor: 'no',
                            title: 'No.',
                            sortable: false,
                            textAlignment: 'center',
                            render(record, index) {
                                return <span>{index + 1}</span>;
                            },
                        },
                        {
                            accessor: 'question',
                            title: 'Pertanyaan',
                            sortable: true,
                            hidden: hideCols.includes('question'),
                            render(record) {
                                return (<HighlightField value={record.question} search={search}/>);
                            },
                        },
                        {
                            accessor: 'option',
                            title: 'Opsi dan Bobot Jawaban',
                            sortable: true,
                            textAlignment: 'center',
                            hidden: hideCols.includes('option'),
                            render: (record) => record.option.map((item, index) =>
                                <div key={`option-${index}`}
                                     className="flex items-center gap-2">
                                <span
                                    className="badge dark:bg-primary-old h-full min-w-16 bg-primary py-2 text-center">{item.point} Poin</span>
                                    <div className="flex w-full">
                                        <div
                                            className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                                            <input
                                                type="radio"
                                                value={item.id}
                                                id={item.id}
                                                name="revisionOptionId"
                                                className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0"
                                            />
                                        </div>
                                        <input type="text"
                                               className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                                               readOnly value={item.value}/>
                                    </div>
                                </div>)
                        },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            textAlignment: 'center',
                            sortable: false,
                            render(record) {
                                return (
                                    // <Link href={`/admin/question/${formGroup.formGroupId}/${record.id}`}
                                    //       className="flex items-center justify-center">
                                        <Tippy content={`Edit survey ${record.name}`} theme="primary">
                                            <button type="button" className="">
                                                <IconPencil/>
                                            </button>
                                        </Tippy>
                                    // </Link>
                                );
                            },
                        },
                    ]}
                    highlightOnHover
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({
                                         from,
                                         to,
                                         totalRecords
                                     }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
}

export default DataTableAdminQuestion;
