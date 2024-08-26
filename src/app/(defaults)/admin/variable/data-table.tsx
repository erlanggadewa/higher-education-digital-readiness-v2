'use client';

import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import { type IRootState } from '@/store';
import { api } from '@/trpc/react';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import Link from 'next/link';
import 'tippy.js/dist/tippy.css';

function DataTableAdminVariable() {
  const [data] = api.admin.variable.getListVariables.useSuspenseQuery();
  const rowData = data;

  const cols: { accessor: string; title: string }[] = [
    { accessor: 'alias', title: 'Inisial Pertanyaan' },
    { accessor: 'name', title: 'Variabel' },
    { accessor: 'description', title: 'Deskripsi' },
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

  return (
    <div>
      <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
        <div className="text-right xl:min-w-96">
          <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
          <DropdownHideColumn isRtl={isRtl} cols={cols} hideCols={hideCols} setHideCols={setHideCols} showHideColumns={showHideColumns} />
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
              accessor: 'alias',
              title: 'Inisial Variabel',
              sortable: true,
              hidden: hideCols.includes('alias'),
              render(record, index) {
                return <span className="badge badge-outline-success rounded-full">{record.alias}</span>;
              },
            },
            {
              accessor: 'name',
              title: 'Variabel',
              sortable: true,
              hidden: hideCols.includes('name'),
            },
            {
              accessor: 'description',
              title: 'Deskripsi',
              sortable: true,
              hidden: hideCols.includes('description'),
            },
            {
              accessor: 'aksi',
              title: 'Aksi',
              textAlignment: 'center',
              sortable: false,
              render(record) {
                return (
                  <div className="flex gap-2">
                    <Link href={`form-group/${record.id}`} className="flex items-center justify-center">
                      <Tippy content={`Edit ${record.name}`} theme="primary">
                        <button type="button" className="">
                          <IconPencil />
                        </button>
                      </Tippy>
                    </Link>
                    <Tippy content={`Remove ${record.name}`} theme="primary">
                      <button type="button" className="">
                        <IconTrash />
                      </button>
                    </Tippy>
                    <Link href={`form-group/${record.id}`} className="flex items-center justify-center">
                      <Tippy content={`Detail ${record.name}`} theme="primary">
                        <button type="button" className="">
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

export default DataTableAdminVariable;
