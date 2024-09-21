'use client';

import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import HighlightField from '@/components/highlight/highlight';
import IconEye from '@/components/icon/icon-eye';
import IconPencil from '@/components/icon/icon-pencil';
import IconPlus from '@/components/icon/icon-plus';
import IconTrash from '@/components/icon/icon-trash';
import { type IRootState } from '@/store';
import { api } from '@/trpc/react';
import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function DataTableAdminQuestion({ year }: { year: string }) {
  const [data] = api.admin.formGroup.getFormGroupByYear.useSuspenseQuery(year);
  const utils = api.useUtils();
  const { mutate: handleUpdatePublished } = api.admin.formGroup.updatePublishedFormGroup.useMutation({
    onSuccess: () => utils.admin.formGroup.getFormGroupByYear.invalidate(year),
  });
  const rowData = data;

  const cols: { accessor: string; title: string; hiddenPrint?: boolean }[] = [
    { accessor: 'name', title: 'Pertanyaan' },
    { accessor: 'isPublished', title: 'Open' },
    { accessor: 'jumlah', title: 'Jumlah Survey' },
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

  return (
    <div>
      <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
        <button type="button" className="btn border-primary bg-white text-primary shadow-none dark:bg-[#191e3a] dark:text-white-light">
          <IconPlus /> Tambah Survey
        </button>

        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
          <DropdownHideColumn isRtl={isRtl} cols={cols} hideCols={hideCols} setHideCols={setHideCols} showHideColumns={showHideColumns} />
          <div className="text-right xl:min-w-96">
            <input type="text" className="form-input ring dark:ring-gray-400" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
              render: (record) => <HighlightField value={record.name} search={search} />,
            },
            {
              accessor: 'isPublished',
              title: 'Open',
              hidden: hideCols.includes('isPublished'),
              render: (record, index) => (
                <label className="relative h-6 w-12">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleUpdatePublished({
                        id: record.id,
                        isPublished: e.target.checked,
                      })
                    }
                    checked={record.isPublished}
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id={`isPublished-${record.id}-${index}`}
                  />
                  <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                </label>
              ),
            },
            {
              accessor: 'jumlah',
              title: 'Jumlah Survey',
              sortable: true,
              hidden: hideCols.includes('jumlah'),
              render: (record) => <HighlightField value={'' + record.variableOnFormGroup.length} search={search} />,
            },
            {
              accessor: 'aksi',
              title: 'Aksi',
              textAlignment: 'center',
              sortable: false,
              render(record) {
                return (
                  <div className="flex justify-center gap-2">
                    <Link href={`form-group/${record.id}`} className="flex items-center justify-center">
                      <Tippy content={`Edit ${record.name}`} theme="primary">
                        <button type="button" className="rounded-lg bg-primary p-2 text-white">
                          <IconPencil />
                        </button>
                      </Tippy>
                    </Link>
                    <Tippy content={`Remove ${record.name}`} theme="danger">
                      <button type="button" className="rounded-lg bg-danger p-2 text-white">
                        <IconTrash />
                      </button>
                    </Tippy>
                    <Link href={`question/${record.id}`} className="flex items-center justify-center">
                      <Tippy content={`Detail ${record.name}`} theme="info">
                        <button type="button" className="rounded-lg bg-info p-2 text-white">
                          <IconEye />
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
          paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
        />
      </div>
    </div>
  );
}

export default DataTableAdminQuestion;
