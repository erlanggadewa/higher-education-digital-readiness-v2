const QuestionOption = ({value, point, id, placeholder, onChange}: {
    value?: string,
    id?: string,
    point?: number,
    placeholder?: string
    onChange?: (value: string) => void
}) => {
    return (point !== undefined ?
            <div className="flex items-center gap-2">
                <span
                    className="badge h-full min-w-16 bg-primary py-2 text-center dark:bg-primary-old">{point} Poin</span>
                <div className="flex w-full">
                    <div
                        className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                        <input disabled type="radio"
                               className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0"/>
                    </div>
                    <input type="text"
                           id={id}
                           className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                           readOnly value={value}/>
                </div>
            </div> :
            <div className="flex w-full">
                <div
                    className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                    <input disabled type="radio"
                           className="form-radio border-white-light text-blue-500 dark:border-white-dark ltr:mr-0 rtl:ml-0"/>
                </div>
                <input type="text"
                       placeholder={placeholder}
                       id={id}
                       className="form-input disabled:pointer-events-none ltr:rounded-l-none rtl:rounded-r-none"
                       value={value} onChange={(e) => onChange && onChange(e.target.value)}/>
            </div>
    );
};

export default QuestionOption;
