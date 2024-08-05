'use client';
import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import ExportFileComponent from '@/components/export/export-file';
import IconPencil from '@/components/icon/icon-pencil';
import { IRootState } from '@/store';
import { api } from '@/trpc/react';
import { cn } from '@/utils/cn';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function DataTableComponent({ year, selectedTab }: { year: string; selectedTab: 'Sedang Direview' | 'Belum Direview' | 'Sudah Direview' | 'Semua' }) {
  // * Ganti api yg diget saja dan value dari cols nya dan sesuaikan type dari TRowData dengan web ini : https://transform.tools/json-to-typescript
  type TRowData = {
    id: string;
    formGroupName: string;
    totalVariable: number;
    status: string;
  };

  const [rowData] = api.reviewer.campus.getFormGroup.useSuspenseQuery({ year });

  const cols: { accessor: keyof TRowData; title: string }[] = [
    { accessor: 'id', title: 'ID' },
    { accessor: 'formGroupName', title: 'Nama Survei' },
    { accessor: 'status', title: 'Status Review' },
    { accessor: 'totalVariable', title: 'Total Variabel' },
  ];

  // * Codingan dibawah ini sudah oke, tidak perlu diganti-ganti

  // show/hide
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(10);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'id',
    direction: 'asc',
  });

  const [hideCols, setHideCols] = useState<any>([]);

  const showHideColumns = (col: any, value: any) => {
    if (hideCols.includes(col)) {
      setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
    } else {
      setHideCols([...hideCols, col]);
    }
  };

  useEffect(() => {
    setInitialRecords(sortBy(rowData, 'id'));
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
        // * Ubah dan custom untuk pencarian disini
        return (
          item.status
            .toString()
            .toLowerCase()
            .includes(selectedTab !== 'Semua' ? selectedTab.toLowerCase() : '') &&
          (item.totalVariable.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.status.toLowerCase().includes(search.toLowerCase()) ||
            item.formGroupName.toLowerCase().includes(search.toLowerCase()))
        );
      });
    });

    // * tambah state yang digunakan untuk search disini
  }, [search, selectedTab]);

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
            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="datatables">
        <DataTable
          className="table-hover whitespace-nowrap rounded-md"
          records={recordsData}
          columns={[
            {
              accessor: 'no',
              title: 'No.',
              sortable: false,
              textAlignment: 'center',
              hidden: hideCols.includes('id'),
              render(record, index) {
                return <span>{index + 1}</span>;
              },
            },
            {
              accessor: 'formGroupName',
              title: 'Nama Form',
              sortable: true,
              hidden: hideCols.includes('formGroupName'),
            },
            {
              accessor: 'totalVariable',
              title: 'Total Variabel',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('totalVariable'),
            },
            {
              accessor: 'status',
              title: 'Status Review',
              sortable: true,
              hidden: hideCols.includes('status'),
              textAlignment: 'center',
              render(record, index) {
                let badgeClass = '';
                switch (record.status) {
                  case 'Sedang Direview':
                    badgeClass = 'bg-warning';
                    break;
                  case 'Belum Direview':
                    badgeClass = 'bg-danger';
                    break;
                  case 'Sudah Direview':
                    badgeClass = 'bg-success';
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
              render(record, index) {
                return (
                  <Tippy content={`Detail ${record.formGroupName}`} theme="primary">
                    <button type="button" className="">
                      <IconPencil fill={true} className="" />
                    </button>
                  </Tippy>
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

export default DataTableComponent;
