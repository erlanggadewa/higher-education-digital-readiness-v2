'use client';

import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import IconEye from '@/components/icon/icon-eye';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrash from '@/components/icon/icon-trash';
import {type IRootState} from '@/store';
import {api} from '@/trpc/react';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import {DataTable, type DataTableSortStatus} from 'mantine-datatable';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import 'tippy.js/dist/tippy.css';
import IconPlus from "@/components/icon/icon-plus";
import HighlightField from "@/components/highlight/highlight";
import ModalTambahSurvey from "./modal-tambah";
import ModalEditSurvey from "./modal-edit";
import Switch from "@/components/elements/switch";
import Swal from "sweetalert2";

function DataTableAdminQuestion({year}: { year: string }) {
    const [data] = api.admin.formGroup.getFormGroupByYear.useSuspenseQuery(year);
    const utils = api.useUtils();
    const {mutate: handleUpdatePublished} = api.admin.formGroup.updatePublishedFormGroup.useMutation({
        onSuccess: () => utils.admin.formGroup.getFormGroupByYear.invalidate(year),
    })
    const {mutate: removeFormGroup} = api.admin.formGroup.removeFormGroup.useMutation({
        onSuccess: () => utils.admin.formGroup.getFormGroupByYear.invalidate(year),
    })
    const rowData = data;

    const cols: { accessor: string; title: string }[] = [
        {accessor: 'name', title: 'Pertanyaan'},
        {accessor: 'isPublished', title: 'Open'},
        {accessor: 'jumlah', title: 'Jumlah Survey'},
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
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedId, setSelectedId] = useState<string>('');

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
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
            });
        });

        // * tambah state yang digunakan untuk search di sini
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

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
        removeFormGroup(id);
    }

    return (
        <div>
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <button onClick={() => setShowModalTambah(true)} type="button"
                        className="btn bg-white text-primary dark:text-white-light dark:bg-[#191e3a] border-primary shadow-none">
                    <IconPlus/> Tambah Survey
                </button>

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
                            accessor: 'name',
                            title: 'Pertanyaan',
                            sortable: true,
                            hidden: hideCols.includes('name'),
                            render: (record) => <HighlightField value={record.name} search={search}/>,
                        },
                        {
                            accessor: 'isPublished',
                            title: 'Open',
                            hidden: hideCols.includes('isPublished'),
                            render: (record, index) => <Switch
                                id={`isPublished-${record.id}-${index}`}
                                onChange={(value: boolean) => handleUpdatePublished({
                                    id: record.id,
                                    isPublished: value
                                })}
                                value={record.isPublished}/>
                        },
                        {
                            accessor: 'jumlah',
                            title: 'Jumlah Survey',
                            sortable: true,
                            hidden: hideCols.includes('jumlah'),
                            render: record => <HighlightField
                                value={"" + record.variableOnFormGroup.filter(e => e._count.question > 0).length}
                                search={search}/>
                        },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            textAlignment: 'center',
                            sortable: false,
                            render(record) {
                                return (
                                    <div className="flex gap-2 justify-center">
                                        <Tippy content={`Edit ${record.name}`} theme="primary">
                                            <button onClick={() => {
                                                setSelectedId(record.id)
                                                setShowModalEdit(true)
                                            }} type="button" className="bg-primary p-2 rounded-lg text-white">
                                                <IconPencil/>
                                            </button>
                                        </Tippy>
                                        <Tippy content={`Remove ${record.name}`} theme="danger">
                                            <button onClick={() => handleRemove(record.id)} type="button"
                                                    className="bg-danger p-2 rounded-lg text-white">
                                                <IconTrash/>
                                            </button>
                                        </Tippy>
                                        <Link href={`question/${record.id}`}
                                              className="flex items-center justify-center">
                                            <Tippy content={`Detail ${record.name}`} theme="info">
                                                <button type="button" className="bg-info p-2 rounded-lg text-white">
                                                    <IconEye/>
                                                </button>
                                            </Tippy>
                                        </Link>
                                    </div>
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
            <ModalTambahSurvey year={year} setShowModal={setShowModalTambah} showModal={showModalTambah}/>
            {!!selectedId &&
                <ModalEditSurvey setShowModal={setShowModalEdit} showModal={showModalEdit} id={selectedId}/>}
        </div>
    );
}

export default DataTableAdminQuestion;
