import {useEffect, useState} from "react";
import IconMinus from "@/components/icon/icon-minus";
import IconPlus from "@/components/icon/icon-plus";

const TouchSpin = ({id, onChange, value: valueProps}: {
    onChange: (value: number) => void,
    value?: number,
    id?: string
}) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(valueProps ?? 0)
    }, [valueProps]);

    useEffect(() => {
        onChange(value)
    }, [value]);

    return <div className="mb-5">
        <div className="relative">
            <div className="flex">
                <button
                    type="button"
                    className="flex items-center justify-center border border-r-0 border-danger bg-danger px-3 font-semibold text-white ltr:rounded-l-md rtl:rounded-r-md"
                    onClick={() => setValue((prevState) => prevState > 0 ? prevState - 1 : 0)}
                >
                    <IconMinus className="h-5 w-5"/>
                </button>
                <input
                    id={id}
                    type="number"
                    placeholder="55"
                    className="form-input rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min={0}
                    max={100}
                    value={value}
                    onChange={(e) => setValue(+e.target.value)}
                    onWheel={() => setValue((prevState) => prevState > 0 ? prevState - 1 : 0)}
                />
                <button
                    type="button"
                    className="flex items-center justify-center border border-l-0 border-warning bg-warning px-3 font-semibold text-white ltr:rounded-r-md rtl:rounded-l-md"
                    onClick={() => setValue((prevState) => prevState < 100 ? prevState + 1 : 100)}
                >
                    <IconPlus/>
                </button>
            </div>
        </div>
    </div>
}

export default TouchSpin;
