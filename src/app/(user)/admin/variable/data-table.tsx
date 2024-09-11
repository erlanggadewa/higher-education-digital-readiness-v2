'use client';

import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrash from '@/components/icon/icon-trash';
import {type IRootState} from '@/store';
import {api} from '@/trpc/react';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import {DataTable, type DataTableSortStatus} from 'mantine-datatable';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import 'tippy.js/dist/tippy.css';
import ExportFileComponent from "@/components/export/export-file";
import HighlightField from "@/components/highlight/highlight";
import ModalEditVariabel from "./modal-edit";
import Swal from "sweetalert2";

function DataTableAdminVariable() {
    const [data] = api.admin.variable.getListVariable.useSuspenseQuery();
    const rowData = data;

    const utils = api.useUtils();
    const {mutate: removeVariable} = api.admin.variable.removeVariable.useMutation({
        onMutate() {
            void Swal.fire({
                title: 'Mohon Tunggu!',
                text: 'Sedang menghapus variabel',
                didOpen: () => Swal.showLoading(),
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: {container: 'sweet-alerts'},
            });
        },
        async onSuccess() {
            await utils.admin.variable.getListVariable.invalidate();
            Swal.close();
            void Swal.fire({
                title: 'Berhasil!',
                text: 'Variabel berhasil dihapus',
                icon: 'success',
                customClass: {container: 'sweet-alerts'},
            });
        },
        onError() {
            Swal.close();
            void Swal.fire({
                title: 'Gagal!',
                text: 'Variabel gagal dihapus',
                icon: 'error',
                customClass: {container: 'sweet-alerts'},
            });
        },
    });

    const cols: { accessor: string; title: string }[] = [
        {accessor: 'name', title: 'Variabel'},
        {accessor: 'description', title: 'Deskripsi'},
    ];
    const colsExport: { accessor: string; title: string }[] = [
        {accessor: 'alias', title: 'Alias'},
        {accessor: 'name', title: 'Variabel'},
        {accessor: 'description', title: 'Deskripsi'},
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
                return item.alias.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase());
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
        removeVariable(id);
    }

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
                            accessor: 'name',
                            title: 'Variabel',
                            sortable: true,
                            hidden: hideCols.includes('name'),
                            render: (record) =>
                                <div className="flex gap-2 items-center">
                                    <HighlightField value={record.name} search={search}/>
                                    <span className="badge badge-outline-success rounded-full">{record.alias}</span>
                                </div>,
                        },
                        {
                            accessor: 'description',
                            title: 'Deskripsi',
                            sortable: true,
                            hidden: hideCols.includes('description'),
                            cellsClassName: 'max-w-sm text-wrap',
                            render: (record) =>
                                <HighlightField
                                    value={record.description} search={search}/>,
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
                                            }} type="button"
                                                    className="bg-primary p-2 rounded-lg text-white">
                                                <IconPencil/>
                                            </button>
                                        </Tippy>
                                        <Tippy content={`Remove ${record.name}`} theme="danger">
                                            <button onClick={() => handleRemove(record.id)} type="button"
                                                    className="bg-danger p-2 rounded-lg text-white">
                                                <IconTrash/>
                                            </button>
                                        </Tippy>
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
            {!!selectedId && <ModalEditVariabel id={selectedId} setShowModal={(value) => setShowModalEdit(value)}
                                                showModal={showModalEdit}/>}
        </div>
    );
}

export default DataTableAdminVariable;
