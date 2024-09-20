import {cn} from "@/utils/cn";

const Switch = ({id, onChange, value, className}: {id?: string, onChange: (value: boolean) => void, value?: boolean, className?: string}) => {
    return (
        <label htmlFor={id} className={cn("w-12 h-6 relative", className)}>
            <input type="checkbox"
                   onChange={(e) => onChange(e.target.checked)}
                   checked={value}
                   className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                   id={id}/>
            <span
                className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
        </label>
    );
};

export default Switch;
