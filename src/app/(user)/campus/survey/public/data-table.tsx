'use client';
import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import ExportFileComponent from '@/components/export/export-file';
import HighlightField from '@/components/highlight/highlight';
import IconCopy from '@/components/icon/icon-copy';
import IconEye from '@/components/icon/icon-eye';
import { type IRootState } from '@/store';
import { cn } from '@/utils/cn';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';

function DataTablePublicFormGroup({
  data,
}: {
  data: {
    roleOnFormGroupId: string;
    formGroupId: string;
    name: string;
    description: string;
    role: string;
    year: string;
    urlPublicSurveyId: string | undefined;
  }[];
}) {
  // * Ganti api yg di get saja dan value dari cols nya dan sesuaikan type dari TRowData dengan web ini : https://transform.tools/json-to-typescript

  const rowData = data;

  const cols: { accessor: string; title: string; hiddenPrint?: boolean; showDropdown?: boolean }[] = [
    { accessor: 'name', title: 'Nama Survei' },
    { accessor: 'description', title: 'Total Variabel', showDropdown: false },
    { accessor: 'role', title: 'Tipe Survei ' },
    { accessor: 'year', title: 'Tahun' },
    { accessor: 'linkSurvey', title: 'Link Survei', hiddenPrint: true },
  ];

  // * Codingan di bawah ini sudah oke, tidak perlu diganti-ganti

  // show/hide
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(10);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'name'));
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
    setInitialRecords(() => {
      return rowData.filter((item) => {
        // * Ubah dan custom untuk pencarian di sini

        return (
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.year.toLowerCase().includes(search.toLowerCase()) ||
          item.role.toLowerCase().includes(search.toLowerCase()) ||
          item.urlPublicSurveyId?.toLowerCase().includes(search.toLowerCase().split('/').reverse()[0] ?? '')
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
        <ExportFileComponent cols={cols} rowData={initialRecords} />

        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
          <DropdownHideColumn isRtl={isRtl} cols={cols} hideCols={hideCols} setHideCols={setHideCols} showHideColumns={showHideColumns} />
          <div className="text-right xl:min-w-96">
            <input type="text" className="form-input ring dark:ring-gray-400" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="datatables">
        <DataTable
          idAccessor="roleOnFormGroupId"
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
              title: 'Nama Survei',
              sortable: true,
              hidden: hideCols.includes('name'),
              render(record, _index) {
                return (
                  <>
                    <HighlightField className="!font-bold" search={search} value={record.name} />
                    <HighlightField search={search} value={record.description} />
                  </>
                );
              },
            },

            {
              accessor: 'role',
              title: 'Tipe Survei',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('role'),
              render(record) {
                return <span className={cn('badge', 'bg-primary capitalize dark:bg-primary-old')}>{record.role}</span>;
              },
            },
            {
              accessor: 'year',
              title: 'Tahun',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('year'),
              render(record) {
                return <HighlightField search={search} value={record.year} />;
              },
            },

            {
              accessor: 'linkSurvey',
              title: 'Link Survei',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('linkSurvey'),
              render(record) {
                return <HighlightField search={search} value={window.location.origin + '/public/' + record.urlPublicSurveyId} />;
              },
            },

            {
              accessor: 'aksi',
              title: 'Aksi',
              textAlignment: 'center',
              sortable: false,

              render(record) {
                return (
                  <div className="flex items-center justify-center gap-2">
                    <Tippy content={`Lihat Survei`} theme="primary">
                      <button type="button" className="btn-sm btn btn-primary">
                        <IconEye className="" />
                      </button>
                    </Tippy>
                    <CopyToClipboard
                      text={window.location.origin + '/public/' + record.urlPublicSurveyId}
                      onCopy={async (text, result) => {
                        if (result) {
                          await Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                          }).fire({
                            icon: 'success',
                            padding: '10px 20px',
                            text: 'Url survei berhasil disalin',
                          });
                        }
                      }}
                    >
                      <div>
                        <Tippy content={`Salin Url Survei`} theme="info">
                          <button type="button" className="btn-sm btn btn-info">
                            <IconCopy className="" />
                          </button>
                        </Tippy>
                      </div>
                    </CopyToClipboard>
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

export default DataTablePublicFormGroup;
