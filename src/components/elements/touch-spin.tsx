import {useEffect, useState} from "react";
import IconMinus from "@/components/icon/icon-minus";
import IconPlus from "@/components/icon/icon-plus";
import {cn} from "@/utils/cn";

const TouchSpin = ({id, onChange, value: valueProps, disabled = false}: {
    onChange?: (value: number) => void,
    value?: number,
    id?: string,
    disabled?: boolean,
}) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(valueProps ?? 0)
    }, [valueProps]);

    useEffect(() => {
        onChange && onChange(value)
    }, [value]);

    return <div className="relative">
        <div className="flex">
            <button
                type="button"
                className={cn("flex items-center justify-center border border-r-0 border-danger bg-danger px-3 font-semibold text-white ltr:rounded-l-md rtl:rounded-r-md", disabled && 'opacity-50 cursor-not-allowed')}
                onClick={() => !disabled && setValue((prevState) => prevState > 0 ? prevState - 1 : 0)}
            >
                <IconMinus className="h-5 w-5"/>
            </button>
            <input
                id={id}
                type="number"
                className={cn("form-input min-w-14 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", disabled && 'disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed')}
                min={0}
                max={100}
                value={value}
                onChange={(e) => !disabled && setValue(+e.target.value)}
                onWheel={() => !disabled && setValue((prevState) => prevState > 0 ? prevState - 1 : 0)}
            />
            <button
                type="button"
                className={cn("flex items-center justify-center border border-l-0 border-warning bg-warning px-3 font-semibold text-white ltr:rounded-r-md rtl:rounded-l-md", disabled && 'opacity-50 cursor-not-allowed')}
                onClick={() => !disabled && setValue((prevState) => prevState < 100 ? prevState + 1 : 100)}
            >
                <IconPlus/>
            </button>
        </div>
    </div>
}

export default TouchSpin;
