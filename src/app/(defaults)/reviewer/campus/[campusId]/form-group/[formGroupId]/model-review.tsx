import IconX from '@/components/icon/icon-x';
import { api } from '@/trpc/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function ModalReviewCampus({
  payload,
  showModal,
  setShowModal,
}: {
  payload: { questionId: string; campusUserId: string; formGroupId: string; variableId: string; year: string };
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) {
  const { questionId, campusUserId, formGroupId, variableId, year } = payload;
  const [data2] = api.reviewer.campus.getModalSelectedSurveyCampusReview.useSuspenseQuery({ questionId, campusUserId, formGroupId, variableId, year });
  return (
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
                    <form className="flex flex-col gap-5">
                      <div>
                        <p className="text-base font-bold">Pertanyaan</p>
                        <div>
                          <input type="text" placeholder="Readonly input here…" className="form-input disabled:pointer-events-none" readOnly />
                        </div>
                      </div>
                      {/* responden */}
                      <div>
                        <p className="text-base font-bold">Jawaban Responden</p>
                        <div className="flex items-center gap-2">
                          <span className="badge h-full min-w-max bg-warning text-xs">10 Poin</span>
                          <div className="flex w-full">
                            <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                              <input type="radio" className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
                            </div>
                            <input
                              id="radioLeft"
                              type="text"
                              placeholder="Radio"
                              className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                              readOnly
                              value={'lorem ipsum'}
                            />
                          </div>
                        </div>
                      </div>
                      {/* reviewer */}
                      <div>
                        <p className="text-base font-bold">Jawaban Responden</p>
                        <div className="flex items-center gap-2">
                          <span className="badge h-full min-w-max bg-warning text-xs">10 Poin</span>
                          <div className="flex w-full">
                            <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                              <input type="radio" className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
                            </div>
                            <input
                              id="radioLeft"
                              type="text"
                              placeholder="Radio"
                              className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                              readOnly
                              value={'lorem ipsum'}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="ctnTextarea" className="text-base font-bold">
                          Keterangan
                        </label>
                        <textarea id="ctnTextarea" rows={3} className="form-textarea" placeholder="Enter Address" required></textarea>
                      </div>
                    </form>
                    <div className="mt-8 flex items-center justify-end">
                      <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-danger">
                        Discard
                      </button>
                      <button type="button" onClick={() => setShowModal(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ModalReviewCampus;
