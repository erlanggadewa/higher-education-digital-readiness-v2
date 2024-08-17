import DefaultAlertComponent from '@/components/alert/elements-alerts-default';
import IconPencil from '@/components/icon/icon-pencil';
import IconX from '@/components/icon/icon-x';
import { api } from '@/trpc/react';
import { cn } from '@/utils/cn';
import { z } from '@/utils/id-zod';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnswerStatus } from '@prisma/client';
import Tippy from '@tippyjs/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function ModalReviewCampus({ payload }: { payload: { questionId: string; campusUserId: string; formGroupId: string; variableId: string; year: string } }) {
  const [showModal, setShowModal] = useState(false);
  const { questionId, campusUserId, formGroupId, variableId, year } = payload;

  const [data] = api.reviewer.campus.getModalSelectedSurveyCampusReview.useSuspenseQuery({ questionId, campusUserId, formGroupId, variableId, year });

  const utils = api.useUtils();

  const createReview = api.reviewer.campus.createReviewSurveyCampus.useMutation({
    onSuccess() {
      void utils.reviewer.campus.getSelectedSurveyCampusReview.invalidate({ campusUserId, formGroupId, variableId });
      void utils.reviewer.campus.getModalSelectedSurveyCampusReview.invalidate({ campusUserId, formGroupId, variableId, year, questionId });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm({
    values: {
      revisionOptionId: data.campusAnswer.revisionOption?.id,
      reviewComment: data.campusAnswer.reviewComment,
      answerStatus: data.campusAnswer.answerStatus,
    },
    resolver: zodResolver(
      z.object({
        revisionOptionId: z.string().cuid().min(1),
        reviewComment: z.string().nullable(),
        answerStatus: z.nativeEnum(AnswerStatus),
      }),
    ),
  });

  const onSubmit = handleSubmit(async (payload) => {
    const status = await Swal.fire({
      icon: 'warning',
      title: data.campusAnswer.answerStatus !== AnswerStatus.APPROVED ? 'Yakin Menyetujui Jawaban ?' : 'Yakin Menolak Jawaban ?',
      text: 'Perhatikan kembali hasil review anda',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
      padding: '2em',
      customClass: { container: 'sweet-alerts' },
    });

    if (!status.isConfirmed) return;

    await Swal.fire({ title: 'Berhasil!', text: 'Hasil review berhasil disimpan', icon: 'success', customClass: { container: 'sweet-alerts' } });

    createReview.mutate({
      campusId: data.campusAnswer.campusId ?? '',
      campusAnswerId: data.campusAnswer.id ?? '',
      questionId: data.id ?? '',
      variableOnFormGroupId: data.variableOnFormGroupId ?? '',
      year: data.year ?? '',
      payload: {
        answerStatus: data.campusAnswer.answerStatus !== AnswerStatus.APPROVED ? AnswerStatus.APPROVED : AnswerStatus.REJECTED,
        reviewComment: payload.reviewComment ?? null,
        revisionOptionId: payload.revisionOptionId ?? '',
      },
    });
  });

  return (
    <>
      <Tippy content={`Review`} theme="primary">
        <button type="button" className="" onClick={() => setShowModal(true)}>
          <IconPencil fill={true} className="" />
        </button>
      </Tippy>
      <div className="mb-5">
        <Transition appear show={showModal} as={Fragment}>
          <Dialog as="div" open={showModal} onClose={() => setShowModal(true)}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0" />
            </Transition.Child>
            <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
              <div className="flex min-h-screen items-start justify-center px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="panel my-8 w-full max-w-3xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-dark">
                      <div className="text-lg font-bold">Review Jawaban</div>
                      <button type="button" onClick={() => setShowModal(false)} className="">
                        <IconX />
                      </button>
                    </div>

                    <div className="p-5">
                      {isDirty && (
                        <div className="mb-4">
                          <DefaultAlertComponent type="info" message="Terjadi perubahan data jawaban" />
                        </div>
                      )}
                      <form onSubmit={onSubmit} className="flex flex-col gap-5">
                        <div>
                          <p className="text-base font-bold">Pertanyaan</p>
                          <div>
                            <input type="text" placeholder="Readonly input here…" className="form-input disabled:pointer-events-none" readOnly value={data.question} />
                          </div>
                        </div>
                        <div>
                          <p className="text-base font-bold">Jawaban Responden</p>
                          <div className="flex items-center gap-2">
                            <span className="badge h-full min-w-16 bg-warning py-2 text-center">{data.campusAnswer.option?.point} Poin</span>
                            <div className="flex w-full">
                              <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                                <input type="radio" className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked name="campusAnswer" />
                              </div>
                              <input
                                id="radioLeft"
                                type="text"
                                placeholder="Radio"
                                className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                                readOnly
                                value={data.campusAnswer.option?.value}
                              />
                            </div>
                          </div>
                        </div>

                        {/* reviewer */}
                        <div>
                          <p className="text-base font-bold">Jawaban Reviewer</p>
                          {data.option.map((item, index) => {
                            return (
                              <div key={index} className="flex items-center gap-2">
                                <span className="badge h-full min-w-16 bg-warning py-2 text-center">{item.point} Poin</span>
                                <label htmlFor={item.id} className="flex w-full">
                                  <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                                    <input
                                      type="radio"
                                      value={item.id}
                                      id={item.id}
                                      {...register('revisionOptionId', { required: true })}
                                      className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0"
                                    />
                                  </div>
                                  <input type="text" placeholder="Radio" className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none" readOnly value={item.value} />
                                </label>
                              </div>
                            );
                          })}
                        </div>

                        {/* keterangan */}
                        <div>
                          <label htmlFor="ctnTextarea" className="text-base font-bold">
                            Keterangan
                          </label>
                          <textarea id="ctnTextarea" rows={3} className="form-textarea" placeholder="Enter Address" {...register('reviewComment', { required: false })}></textarea>
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button type="button" onClick={() => reset()} className="btn btn-warning">
                            Reset
                          </button>

                          {data.campusAnswer.answerStatus === 'APPROVED' && (
                            <button type="submit" onClick={() => setValue('answerStatus', AnswerStatus.REJECTED)} className={cn('btn ltr:ml-4 rtl:mr-4', 'btn-danger')}>
                              Tolak
                            </button>
                          )}
                          {(data.campusAnswer.answerStatus !== 'APPROVED' || isDirty) && (
                            <button type="submit" onClick={() => setValue('answerStatus', AnswerStatus.APPROVED)} className={cn('btn ltr:ml-4 rtl:mr-4', 'btn-primary')}>
                              Setujui
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default ModalReviewCampus;
