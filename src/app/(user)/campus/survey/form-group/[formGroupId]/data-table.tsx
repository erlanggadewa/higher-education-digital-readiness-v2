'use client';
import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import ExportFileComponent from '@/components/export/export-file';
import HighlightField from '@/components/highlight/highlight';
import IconPencil from '@/components/icon/icon-pencil';
import { type IRootState } from '@/store';
import { cn } from '@/utils/cn';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';

function DataTableCampusSelectedFormGroup({
  data,
}: {
  data: {
    formGroupId: string | undefined;
    formGroupName: string | undefined;
    formGroupDescription: string | undefined;
    year: string | undefined;
    variable: {
      variableOnFormGroupId: string;
      variableAlias: string;
      variableName: string;
      variableDescription: string;
      status: string | undefined;
      takeTime: Date | undefined;
      totalQuestion: number;
    }[];
  };
}) {
  const router = useRouter();
  // * Ganti api yg di get saja dan value dari cols nya dan sesuaikan type dari TRowData dengan web ini : https://transform.tools/json-to-typescript

  const rowData = data.variable;

  const cols: { accessor: string; title: string; hiddenPrint?: boolean; showDropdown?: boolean }[] = [
    { accessor: 'variableName', title: 'Nama Variabel' },
    { accessor: 'variableAlias', title: 'Alias Variabel' },
    { accessor: 'variableDescription', title: 'Deskripsi Variabel' },
    { accessor: 'totalQuestion', title: 'Pertanyaan' },
    { accessor: 'takeTime', title: 'Waktu Pengerjaan' },
    { accessor: 'status', title: 'Status Survei' },
  ];

  // * Codingan di bawah ini sudah oke, tidak perlu diganti-ganti

  // show/hide
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(10);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'variableName',
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
    setInitialRecords(sortBy(rowData, 'variableAlias'));
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
    setInitialRecords(() => {
      return rowData.filter((item) => {
        // * Ubah dan custom untuk pencarian di sini
        return (
          item.variableAlias.toLowerCase().includes(search.toLowerCase()) ||
          item.variableName.toLowerCase().includes(search.toLowerCase()) ||
          item.variableDescription.toLowerCase().includes(search.toLowerCase()) ||
          item.totalQuestion.toString().toLowerCase().includes(search.toLowerCase()) ||
          item.takeTime?.toLocaleString().toLowerCase().includes(search.toLowerCase())
        );
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
        <ExportFileComponent fileName={data.formGroupName} cols={cols} rowData={initialRecords} />

        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
          <DropdownHideColumn isRtl={isRtl} cols={cols} hideCols={hideCols} setHideCols={setHideCols} showHideColumns={showHideColumns} />
          <div className="text-right xl:min-w-96">
            <input type="text" className="form-input ring dark:ring-gray-400" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="datatables">
        <DataTable
          idAccessor="variableOnFormGroupId"
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
              accessor: 'variableName',
              title: 'Nama Variabel',
              sortable: true,
              hidden: hideCols.includes('variableName') || hideCols.includes('variableAlias'),
              render(record, _index) {
                return (
                  <>
                    <HighlightField search={search} value={record.variableAlias} />
                    <HighlightField search={search} value={record.variableName} />
                  </>
                );
              },
            },
            {
              accessor: 'variableDescription',
              title: 'Deskripsi Variabel',
              sortable: true,
              hidden: hideCols.includes('variableDescription'),
              render(record) {
                return (
                  <div className="max-w-sm text-wrap">
                    <HighlightField search={search} value={record.variableDescription} />
                  </div>
                );
              },
            },
            {
              accessor: 'totalQuestion',
              title: 'Pertanyaan',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('totalQuestion'),
              render(record) {
                return <HighlightField search={search} value={record.totalQuestion.toString()} />;
              },
            },
            {
              accessor: 'takeTime',
              title: 'Waktu Pengerjaan',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('takeTime'),
              render(record) {
                return <HighlightField search={search} value={record.takeTime ? record.takeTime.toLocaleString() : '-'} />;
              },
            },

            {
              accessor: 'status',
              title: 'Status Survei',
              sortable: true,
              hidden: hideCols.includes('status'),
              textAlignment: 'center',
              render(record) {
                let badgeClass = '';
                switch (record.status) {
                  case 'Belum Disetujui':
                    badgeClass = 'bg-warning dark:bg-warning-old';
                    break;
                  case 'Sudah Disetujui':
                    badgeClass = 'dark:bg-success-old bg-success';
                    break;
                  case 'Menunggu Dikerjakan':
                    badgeClass = 'dark:bg-danger-old bg-danger';
                    break;
                }
                return <span className={cn('badge', badgeClass)}>{record.status}</span>;
              },
            },

            {
              accessor: 'aksi',
              title: 'Aksi',
              textAlignment: 'center',
              sortable: false,
              render(record) {
                const isTake = record.status === 'Sudah Disetujui' || record.status === 'Belum Disetujui';
                return (
                  <div className="flex items-center justify-center">
                    <Tippy content={isTake ? 'Ubah Jawaban' : 'Kerjakan'} theme={isTake ? 'danger' : 'primary'}>
                      <button
                        type="button"
                        className={cn('btn-sm btn', isTake ? 'btn-danger' : 'btn-primary')}
                        onClick={async () => {
                          const status = await Swal.fire({
                            icon: isTake ? 'warning' : 'question',
                            title: isTake ? 'Anda yakin ingin mengubah jawaban?' : 'Anda yakin ingin mengerjakan?',
                            text: isTake ? 'Hal ini akan mereset status review anda!' : 'Harap kerjakan dan selesaikan survei ini dengan baik!',
                            showCancelButton: true,
                            confirmButtonText: 'Ya',
                            cancelButtonText: 'Batal',
                            padding: '2em',
                            customClass: { container: 'sweet-alerts' },
                          });

                          if (!status.isConfirmed) return;

                          router.push(`/campus/survey/take/variable-form-group/${record.variableOnFormGroupId}`);
                        }}
                      >
                        <IconPencil fill={true} className="" />
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
          paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
        />
      </div>
    </div>
  );
}

export default DataTableCampusSelectedFormGroup;
