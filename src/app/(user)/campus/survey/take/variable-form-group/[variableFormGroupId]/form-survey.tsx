'use client';
import DefaultAlertComponent from '@/components/alert/elements-alerts-default';
import IconChecks from '@/components/icon/icon-checks';
import IconRefresh from '@/components/icon/icon-refresh';
import IconTask from '@/components/icon/icon-task';
import { type GetQuestionCampusSurvey } from '@/server/api/routers/campus/types/get-question-campus-survey';
import { api } from '@/trpc/react';
import { ErrorMessage } from '@hookform/error-message';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import BackButton from './back-button';

function FormSurvey({ data }: { data: GetQuestionCampusSurvey }) {
  const session = useSession();
  const router = useRouter();

  const [totalAnswer, setTotalAnswer] = useState(0);
  const totalPercentage = Math.round((totalAnswer / data.question.length) * 100);

  const createAnswerQuestion = api.campus.campusSurvey.answerQuestion.useMutation({
    onMutate() {
      void Swal.fire({
        title: 'Mohon Tunggu!',
        text: 'Sedang menyimpan jawaban anda',
        didOpen: () => Swal.showLoading(),
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: { container: 'sweet-alerts' },
      });
    },
    async onSuccess() {
      Swal.close();
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Jawaban anda berhasil disimpan',
        icon: 'success',
        customClass: { container: 'sweet-alerts' },
      });
      router.push(`/campus/survey/form-group/${data.formGroupId}`);
      router.refresh();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    values: {
      answer: data.question.map((question) => {
        return {
          questionId: question.id,
          answerId: question.campusAnswer[0]?.optionId ?? '',
        };
      }),
    },
  });

  // Function to update totalAnswer based on the current form state
  const updateTotalAnswer = () => {
    const answers = getValues('answer') || [];
    const count = answers.filter((answer) => answer?.answerId).length;
    setTotalAnswer(count);
  };

  // This effect runs on initial render and whenever 'answer' field changes
  useEffect(() => {
    // Update on initial render
    updateTotalAnswer();

    // Subscribe to form changes
    const subscription = watch(updateTotalAnswer);

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, [watch, getValues]); // Include dependencies to trigger effect when they change

  const onSubmit = handleSubmit(async (payload) => {
    const status = await Swal.fire({
      icon: 'question',
      title: 'Anda yakin ingin mengirim jawaban?',
      text: 'Semua yang anda kerjakan akan disimpan dan direview oleh admin!',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
      padding: '2em',
      customClass: { container: 'sweet-alerts' },
    });

    if (!status.isConfirmed) return;
    createAnswerQuestion.mutate({
      answer: payload.answer,
      campusId: session.data?.user.id ?? '',
      variableOnFormGroupId: data.id,
      year: data.formGroup.year,
    });
  });

  return (
    <>
      <div className="sticky top-[56px] z-10">
        <div className="banner flex h-20 flex-wrap items-center justify-center gap-3 !rounded-b-none sm:justify-between">
          <BackButton />
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-xl text-white">{data?.formGroup.name}</h1>
            <span className="badge bg-white text-black">{data?.variable.alias}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-base font-semibold text-white">
              {totalAnswer} / {data.question.length}
            </span>
            <IconTask className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="-mx-2 flex items-center justify-center gap-3 bg-[#ebedf2] px-6 py-2 dark:bg-[#222222] md:-mx-6">
          <div className="h-2 w-full rounded-full bg-primary/30 dark:bg-primary/40">
            <div style={{ width: `${totalPercentage}%` }} className="h-2 rounded-full bg-gradient-to-r from-[#3cba92] to-[#0ba360] duration-300"></div>
          </div>
          <span className="text-base font-semibold">{totalPercentage}%</span>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="xl m-auto max-w-4xl">
          {data.question.map((question, index) => {
            return (
              <div className="panel my-10 border-l-8 border-l-primary shadow-md duration-150 hover:scale-105 hover:shadow-lg dark:border-l-primary-old" key={question.id}>
                <p className="mb-3 text-base font-bold">
                  {index + 1}. {question.question}
                </p>
                {question.option.map((option) => {
                  return (
                    <label htmlFor={option.id} key={option.id}>
                      <div className="my-2 flex w-full hover:cursor-pointer">
                        <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#444444] dark:bg-[#454545] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                          <input
                            type="radio"
                            value={option.id}
                            id={option.id}
                            {...register(`answer.${index}.answerId`, { required: 'Pertanyaan wajib dijawab' })}
                            onChange={(e) => {
                              setValue(`answer.${index}.answerId`, e.target.value, { shouldDirty: true, shouldValidate: true });
                            }}
                            className="form-radio border-white-light text-primary dark:border-white-dark ltr:mr-0 rtl:ml-0"
                          />
                        </div>
                        <div className="form-input ltr:rounded-l-none rtl:rounded-r-none">{option.value}</div>
                      </div>
                    </label>
                  );
                })}

                <ErrorMessage errors={errors} name={`answer.${index}.answerId`} render={({ message }) => <DefaultAlertComponent type="danger" message={message} />} />

                {dirtyFields.answer?.[index] && data.campusSurveyLog.length !== 0 && (
                  <div className="mb-4">
                    <DefaultAlertComponent type="warning" message="Terjadi perubahan data jawaban" />
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button type="button" onClick={() => reset()} className="btn btn-warning mb-5 w-full rounded-lg">
              <IconRefresh className="mr-2 h-6 w-6" />
              RESET
            </button>
            <button type="submit" className="btn btn-primary mb-5 w-full rounded-lg">
              <IconChecks className="mr-2 h-6 w-6" />
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormSurvey;
