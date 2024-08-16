import IconPencil from '@/components/icon/icon-pencil';
import IconX from '@/components/icon/icon-x';
import { api } from '@/trpc/react';
import { z } from '@/utils/id-zod';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function ModalReviewCampus({ payload }: { payload: { questionId: string; campusUserId: string; formGroupId: string; variableId: string; year: string } }) {
  const [showModal, setShowModal] = useState(false);
  const { questionId, campusUserId, formGroupId, variableId, year } = payload;

  const [data] = api.reviewer.campus.getModalSelectedSurveyCampusReview.useSuspenseQuery({ questionId, campusUserId, formGroupId, variableId, year });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      questionId,
      campusUserId,
      year,
      revisionOptionId: data.campusAnswer.revisionOption?.id,
      reviewComment: data.campusAnswer.reviewComment,
    },
    resolver: zodResolver(
      z.object({
        questionId: z.string().cuid().min(1),
        campusUserId: z.string().cuid().min(1),
        year: z.string().min(4).max(4),
        revisionOptionId: z.string().cuid().min(1),
      }),
    ),
  });
  const onSubmit = handleSubmit(async (data) => {
    const status = await Swal.fire({
      icon: 'warning',
      title: 'Yakin Submit Review?',
      text: 'Perhatikan kembali hasil review anda',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Batal',
      padding: '2em',
      customClass: { container: 'sweet-alerts' },
    });

    if (!status.isConfirmed) return;

    await Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: { container: 'sweet-alerts' } });
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
                      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
                                <div className="flex w-full">
                                  <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                                    <input
                                      type="radio"
                                      className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0"
                                      // defaultChecked={data.campusAnswer.revisionOption?.id === item.id}
                                      value={item.id}
                                      {...register('revisionOptionId', { required: true })}
                                    />
                                  </div>
                                  <input
                                    id="radioLeft"
                                    type="text"
                                    placeholder="Radio"
                                    className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                                    readOnly
                                    value={item.value}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* keterangan */}
                        <div>
                          <label htmlFor="ctnTextarea" className="text-base font-bold">
                            Keterangan
                          </label>
                          <textarea
                            id="ctnTextarea"
                            rows={3}
                            className="form-textarea"
                            placeholder="Enter Address"
                            value={data.campusAnswer.reviewComment ?? undefined}
                            {...register('reviewComment', { required: false, value: data.campusAnswer.reviewComment })}
                          ></textarea>
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button type="reset" className="btn btn-outline-danger">
                            Reset
                          </button>
                          <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Simpan
                          </button>
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
