'use client';

import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import ExportFileComponent from '@/components/export/export-file';
import HighlightField from '@/components/highlight/highlight';
import IconPencil from '@/components/icon/icon-pencil';
import {type GetQuestion} from '@/server/api/routers/admin/types/get-question';
import {type IRootState} from '@/store';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import {DataTable, type DataTableSortStatus} from 'mantine-datatable';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import QuestionOption from '@/components/elements/question-option';
import 'tippy.js/dist/tippy.css';
import ModalEditPertanyaan from "./modal-edit";
import IconTrash from "@/components/icon/icon-trash";
import Swal from "sweetalert2";
import {api} from "@/trpc/react";

function DataTableAdminQuestion({data}: { data: GetQuestion }) {
    const rowData = data.question;

    const utils = api.useUtils();
    const {mutate: removeQuestion} = api.admin.question.removeQuestion.useMutation({
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
            await Promise.all([
                utils.admin.question.getQuestion.invalidate(),
                utils.admin.formGroup.getFormGroupById.invalidate(data.formGroup?.id),
                utils.admin.formGroup.getFormGroupByYear.invalidate(data.formGroup?.year),
            ])
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
                return item.question.includes(search.toLowerCase()) || item.option.some((opt) => opt.value.includes(search.toLowerCase()));
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
        removeQuestion(id);
    }

    return (
        <div>
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <ExportFileComponent fileName={`Daftar Pertanyaan ${data.variable?.alias} (${data.variable?.name})`}
                                     cols={colsExport} rowData={initialRecords}/>

                <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                    <DropdownHideColumn isRtl={isRtl} cols={cols} hideCols={hideCols} setHideCols={setHideCols}
                                        showHideColumns={showHideColumns}/>
                    <div className="text-right xl:min-w-96">
                        <input type="text" className="form-input ring dark:ring-gray-400" placeholder="Search..."
                               value={search} onChange={(e) => setSearch(e.target.value)}/>
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
                                return <HighlightField value={record.question} search={search}/>;
                            },
                        },
                        {
                            accessor: 'option',
                            title: 'Opsi dan Bobot Jawaban',
                            sortable: true,
                            textAlignment: 'center',
                            hidden: hideCols.includes('option'),
                            render: (record) =>
                                record.option.map((item, index) => (
                                    <QuestionOption key={`option-${index}`} value={item.value} point={item.point}/>
                                )),
                        },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            textAlignment: 'center',
                            sortable: false,
                            render(record) {
                                return (
                                    <div className="flex gap-2 justify-center">
                                        <Tippy content={`Edit pertanyaan ${record.question}`} theme="primary">
                                            <button onClick={() => {
                                                setSelectedId(record.id)
                                                setShowModalEdit(true)
                                            }} type="button" className="rounded-lg bg-primary p-2 text-white">
                                                <IconPencil/>
                                            </button>
                                        </Tippy>
                                        <Tippy content={`Remove pertanyaan ${record.question}`} theme="danger">
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
            {selectedId &&
                <ModalEditPertanyaan setShowModal={setShowModalEdit} showModal={showModalEdit} id={selectedId}/>}
        </div>
    );
}

export default DataTableAdminQuestion;
