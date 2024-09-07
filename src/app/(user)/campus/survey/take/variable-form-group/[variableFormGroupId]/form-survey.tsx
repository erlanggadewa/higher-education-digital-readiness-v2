import IconTask from '@/components/icon/icon-task';
import { type GetQuestionCampusSurvey } from '@/server/api/routers/campus/types/get-question-campus-survey';
import BackButton from './back-button';

function FormSurvey({ data }: { data: GetQuestionCampusSurvey }) {
  console.log('🚀 data ~ File: form-survey.tsx');
  console.dir(data, { depth: null });
  console.log('🔚 data ~ File: form-survey.tsx');
  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="banner flex h-24 flex-wrap items-center justify-between gap-3">
          <BackButton />
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-xl text-white">{data?.formGroup.name}</h1>
            <span className="badge bg-white text-black">{data?.variable.alias}</span>
          </div>
          <IconTask className="h-10 w-10 text-white" />
        </div>
        <div className="-mx-2 flex items-center justify-center gap-3 bg-[#ebedf2] px-6 py-2 dark:bg-dark/40 md:-mx-6">
          <div className="h-2 w-full rounded-full bg-primary/30 dark:bg-primary/40">
            <div className="h-2 w-5/12 rounded-full bg-gradient-to-r from-[#3cba92] to-[#0ba360]"></div>
          </div>
          <span className="font-semibold">25%</span>
        </div>
      </div>
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
                          name={option.questionId}
                          // onChange={(e) => setValue('revisionOptionId', e.target.value, { shouldDirty: true })}
                          className="form-radio border-white-light text-primary dark:border-white-dark ltr:mr-0 rtl:ml-0"
                        />
                      </div>
                      <div className="form-input ltr:rounded-l-none rtl:rounded-r-none">{option.value}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FormSurvey;
