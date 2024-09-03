'use client';
import DropdownHideColumn from '@/components/dropdown/dropdown-column';
import { type IRootState } from '@/store';
import { api } from '@/trpc/react';
import { Highlight } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import ModalReviewCampus from './model-review';

function DataTableReviewerSelectedCampus({ campusUserId, variableId, formGroupId }: { campusUserId: string; variableId: string; formGroupId: string }) {
  const [data] = api.reviewer.campus.getSelectedSurveyCampusReview.useSuspenseQuery({ campusUserId, formGroupId, variableId });
  const rowData = data.question;

  const cols: { accessor: string; title: string }[] = [
    { accessor: 'question', title: 'Pertanyaan' },
    { accessor: 'option', title: 'Jawaban' },
    { accessor: 'answer.reviewComment', title: 'Keterangan' },
    { accessor: 'answer.reviewStatus', title: 'Status' },
  ];

  // show/hide
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(10);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'formGroupId'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'formGroupName',
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
    if (!rowData) return;
    setInitialRecords(() => {
      return rowData.filter((item) => {
        // * Ubah dan custom untuk pencarian di sini
        return (
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.campusAnswer
            .flatMap(
              (a) =>
                a.answerStatus.toLowerCase().includes(search.toLowerCase()) ||
                a.revisionOption.value.toLowerCase().includes(search.toLowerCase()) ||
                a.option.value.toLowerCase().includes(search.toLowerCase()),
            )
            .includes(true) ||
          item.answer.reviewComment?.toLowerCase().includes(search.toLowerCase())
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
        <div className="text-right xl:min-w-96">
          <input type="text" className="form-input ring dark:ring-gray-400" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
              accessor: 'question',
              title: 'Pertanyaan',
              sortable: true,
              hidden: hideCols.includes('question'),
              render(record) {
                return (
                  <Highlight highlightColor="teal" highlight={search}>
                    {record.question}
                  </Highlight>
                );
              },
            },
            {
              accessor: 'option',
              title: 'Jawaban',
              sortable: true,
              hidden: hideCols.includes('option'),
              render(record, _index) {
                return (
                  <div>
                    {record.campusAnswer.map((item, index) => {
                      return (
                        <div key={index} className="flex flex-col gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="badge bg-warning dark:bg-warning-old">{item.option.point} Poin</span>
                              <span className="badge badge-outline-info">Jawaban Responden</span>
                            </div>
                            <Highlight highlightColor="teal" highlight={search}>
                              {item.option.value}
                            </Highlight>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="badge bg-warning dark:bg-warning-old">{item.revisionOption.point} Poin</span>
                              <span className="badge badge-outline-success">Jawaban Reviewer</span>
                            </div>
                            <Highlight highlightColor="teal" highlight={search}>
                              {item.revisionOption.value}
                            </Highlight>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              },
            },
            {
              accessor: 'answer.reviewComment',
              title: 'Keterangan',
              sortable: true,
              hidden: hideCols.includes('answer.reviewComment'),
              render(record) {
                return (
                  <Highlight highlightColor="teal" highlight={search}>
                    {record.answer.reviewComment ? record.answer.reviewComment : '-'}
                  </Highlight>
                );
              },
            },
            {
              accessor: 'answer.reviewStatus',
              title: 'Status',
              sortable: true,
              textAlignment: 'center',
              hidden: hideCols.includes('answer.reviewStatus'),
              render(record, _index) {
                let badgeColor = '';
                let value = '';
                if (record.answer.reviewStatus === 'APPROVED') {
                  badgeColor = 'bg-success dark:bg-success-old';
                  value = 'Disetujui';
                } else if (record.answer.reviewStatus === 'REJECTED') {
                  badgeColor = 'bg-danger dark:bg-danger-old';
                  value = 'Ditolak';
                } else if (record.answer.reviewStatus === 'WAITING') {
                  badgeColor = 'bg-warning dark:bg-warning-old';
                  value = 'Menunggu';
                }

                return <span className={`badge ${badgeColor}`}>{value}</span>;
              },
            },

            {
              accessor: 'aksi',
              title: 'Aksi',
              textAlignment: 'center',
              sortable: false,
              render(record, index) {
                return (
                  <ModalReviewCampus
                    key={index}
                    payload={{
                      campusUserId,
                      formGroupId,
                      variableId,
                      questionId: record.id,
                      year: record.year,
                    }}
                  />
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

export default DataTableReviewerSelectedCampus;
