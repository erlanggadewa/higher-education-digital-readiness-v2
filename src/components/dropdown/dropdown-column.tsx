import IconCaretDown from '../icon/icon-caret-down';
import Dropdown from './dropdown';

function DropdownHideColumn({
  isRtl,
  cols,
  hideCols,
  setHideCols,
  showHideColumns,
}: {
  isRtl: boolean;
  cols: { accessor: string; title: string }[];
  hideCols: any;
  setHideCols: (e: any) => void;
  showHideColumns: (accessor: any, target: any) => void;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center">
      <div className="dropdown">
        <Dropdown
          placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
          btnClassName="!flex items-center border font-semibold border-white-light ring dark:ring-gray-400 dark:border-dark rounded-md px-4 py-2 text-sm dark:bg-dark dark:text-white-dark"
          button={
            <>
              <span className="ltr:mr-1 rtl:ml-1">Columns</span>
              <IconCaretDown className="h-5 w-5" />
            </>
          }
        >
          <ul className="min-w-min">
            {cols.map((col, i) => {
              return (
                <li
                  key={i}
                  className="flex flex-col"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex items-center px-4 py-1">
                    <label className="mb-0 min-w-max cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!hideCols.includes(col.accessor)}
                        className="form-checkbox"
                        defaultValue={col.accessor}
                        onChange={(event: any) => {
                          setHideCols(event.target.value);
                          showHideColumns(col.accessor, event.target.checked);
                        }}
                      />
                      <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}

export default DropdownHideColumn;
