import IconHome from '@/components/icon/icon-home';

const ElementsBreadcrumbsDefault = () => {
  return (
    <div className="my-1">
      <ol className="flex font-semibold text-white dark:text-white-dark">
        <li>
          <button className="cursor-default">
            <IconHome className="h-4 w-4" />
          </button>
        </li>
        <li className="before:px-1.5 before:content-['/']">
          <button className="cursor-default">Reviewer</button>
        </li>
        <li className="before:px-1.5 before:content-['/']">
          <button className="cursor-default">Campus</button>
        </li>
      </ol>
    </div>
  );
};

export default ElementsBreadcrumbsDefault;
