'use client';
import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import ExportFileComponent from '@/components/export/export-file';
import HighlightField from '@/components/highlight/highlight';
import IconPencil from '@/components/icon/icon-pencil';
import { type IRootState } from '@/store';
import { cn } from '@/utils/cn';
import { type SurveyLogStatus } from '@prisma/client';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
      variableId: string;
      variableAlias: string;
      variableName: string;
      variableDescription: string;
      status: SurveyLogStatus | undefined;
      takeTime: Date | undefined;
      totalQuestion: number;
    }[];
  };
}) {
  // * Ganti api yg di get saja dan value dari cols nya dan sesuaikan type dari TRowData dengan web ini : https://transform.tools/json-to-typescript

  const rowData = data.variable;

  const cols: { accessor: string; title: string }[] = [
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
    setInitialRecords(sortBy(rowData, 'formGroupName'));
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
        return [];
      });
    });

    // * tambah state yang digunakan untuk search di sini
  }, [search]);
  console.log('🚀 ~ search:', search);

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
          idAccessor="formGroupId"
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
                let value = '';
                switch (record.status) {
                  case 'WAITING':
                    badgeClass = 'bg-info dark:bg-info-old';
                    value = 'Menunggu Direview';
                    break;
                  case 'REVIEWED':
                    badgeClass = 'dark:bg-success-old bg-success';
                    value = 'Selesai Direview';
                    break;
                }
                return <span className={cn('badge', badgeClass)}>{value}</span>;
              },
            },

            {
              accessor: 'aksi',
              title: 'Aksi',
              textAlignment: 'center',
              sortable: false,
              render(record) {
                return (
                  <Link href={`form-group/${data.formGroupId}/variable/${record.variableId}`} className="flex items-center justify-center">
                    <Tippy content={`Detail ${record.variableName}`} theme="primary">
                      <button type="button" className="btn-sm btn btn-primary">
                        <IconPencil fill={true} className="" />
                      </button>
                    </Tippy>
                  </Link>
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
