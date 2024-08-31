import IconHome from '@/components/icon/icon-home';

const ElementsBreadcrumbsDefault = ({ data }: { data: string[] }) => {
  return (
    <>
      <ol className="flex font-semibold text-white dark:text-white-dark">
        <li>
          <button className="cursor-default">
            <IconHome className="h-4 w-4" />
          </button>
        </li>
        {data.map((item, index) => (
          <li className="before:px-1.5 before:content-['/']" key={index}>
            <button className="cursor-default">{item}</button>
          </li>
        ))}
      </ol>
    </>
  );
};

export default ElementsBreadcrumbsDefault;
