'use client';
import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import ExportFileComponent from '@/components/export/export-file';
import IconPencil from '@/components/icon/icon-pencil';
import TabsFormGroup from '@/components/tabs/tabs-form-group';
import { type IRootState } from '@/store';
import { cn } from '@/utils/cn';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

// * Ganti api yg diget saja dan value dari cols nya dan sesuaikan type dari TRowData dengan web ini : https://transform.tools/json-to-typescript
type TRowData = {
  campusId: string;
  imgUrl: string | null;
  email: string;
  campusName: string;
  submitTime: Date | undefined;
  status: string;
};

function DataTableReviewerSelectedFormGroupCampus({ rowData, formGroupId }: { rowData: TRowData[]; formGroupId: string }) {
  const [selectedTab, setSelectedTab] = useState<'Sedang Direview' | 'Belum Direview' | 'Sudah Direview' | 'Semua'>('Semua');

  const cols: { accessor: keyof TRowData; title: string }[] = [
    { accessor: 'campusName', title: 'Nama Kampus' },
    { accessor: 'submitTime', title: 'Waktu Submit' },
    { accessor: 'status', title: 'Status Review' },
  ];

  // * Codingan dibawah ini sudah oke, tidak perlu diganti-ganti

  // show/hide
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(10);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'campusName'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'campusName',
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
    setInitialRecords(sortBy(rowData, 'campusName'));
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
          item.status
            .toString()
            .toLowerCase()
            .includes(selectedTab !== 'Semua' ? selectedTab.toLowerCase() : '') &&
          (item.submitTime?.toLocaleString().toLowerCase().includes(search.toLowerCase()) ??
            (item.status.toLowerCase().includes(search.toLowerCase()) || item.campusName.toLowerCase().includes(search.toLowerCase())))
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
    <>
      <div className="my-3">
        <TabsFormGroup setSelectedTab={setSelectedTab} />
      </div>

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
            idAccessor="campusId"
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
                accessor: 'campusName',
                title: 'Nama Kampus',
                sortable: true,
                hidden: hideCols.includes('campusName'),
              },
              {
                accessor: 'submitTime',
                title: 'Waktu Submit',
                sortable: true,
                textAlignment: 'center',
                hidden: hideCols.includes('submitTime'),
                render(record) {
                  return <span>{record.submitTime ? new Date(record.submitTime).toLocaleString() : '-'}</span>;
                },
              },
              {
                accessor: 'status',
                title: 'Status Review',
                sortable: true,
                hidden: hideCols.includes('status'),
                textAlignment: 'center',
                render(record) {
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
                render(record) {
                  return (
                    <Link href={`/reviewer/campus/${record.campusId}/form-group/${formGroupId}`} className="flex items-center justify-center">
                      <Tippy content={`Detail `} theme="primary">
                        <button type="button" className="">
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
    </>
  );
}

export default DataTableReviewerSelectedFormGroupCampus;
