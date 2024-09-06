import { type GetQuestionCampusSurvey } from '@/server/api/routers/campus/types/get-question-campus-survey';

function FormSurvey({ data }: { data: GetQuestionCampusSurvey }) {
  return (
    <div className="xl m-auto max-w-4xl">
      <div className="mb-4 h-4 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
        <div className="h-4 w-5/12 rounded-full bg-gradient-to-r from-[#3cba92] to-[#0ba360]"></div>
      </div>
      <div className="panel border-l-8 border-l-primary">
        <p className="mb-3 text-base font-bold">1. Jawaban Reviewer</p>

        <div className="flex w-full">
          <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
            <input
              key={'index'}
              type="radio"
              value={'item.id'}
              id={'item.id'}
              name="revisionOptionId"
              // onChange={(e) => setValue('revisionOptionId', e.target.value, { shouldDirty: true })}
              className="form-radio border-white-light text-primary dark:border-white-dark ltr:mr-0 rtl:ml-0"
            />
          </div>
          <input type="text" className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none" readOnly value={'item.value'} />
        </div>
      </div>
    </div>
  );
}

export default FormSurvey;
