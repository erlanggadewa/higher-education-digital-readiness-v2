function TableSkeletonComponent() {
  return (
    <div className="panel relative animate-pulse overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="rounded-tl-md bg-gray-300 px-6 py-3 dark:bg-zinc-800">
              <div className="h-4 w-1/2 rounded bg-zinc-600"></div>
            </th>
            <th scope="col" className="bg-gray-300 px-6 py-3 dark:bg-zinc-800">
              <div className="h-4 w-1/2 rounded bg-zinc-600"></div>
            </th>
            <th scope="col" className="bg-gray-300 px-6 py-3 dark:bg-zinc-800">
              <div className="h-4 w-1/2 rounded bg-zinc-600"></div>
            </th>
            <th scope="col" className="rounded-tr-md bg-gray-300 px-6 py-3 dark:bg-zinc-800">
              <div className="h-4 w-1/2 rounded bg-zinc-600"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="!border-none bg-gray-200 dark:bg-dark">
            <th scope="row" className="whitespace-nowrap bg-gray-200 px-6 py-4 font-medium text-gray-900 dark:bg-zinc-700 dark:text-white">
              <div className="h-4 w-1/2 rounded bg-gray-400 dark:bg-gray-500"></div>
            </th>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/3 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-3/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
          </tr>
          <tr className="!border-none bg-gray-200 dark:bg-dark">
            <th scope="row" className="whitespace-nowrap bg-gray-200 px-6 py-4 font-medium text-gray-900 dark:bg-zinc-700 dark:text-white">
              <div className="h-4 w-1/2 rounded bg-gray-400 dark:bg-gray-500"></div>
            </th>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/3 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-3/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
          </tr>
          <tr className="!border-none bg-gray-200 dark:bg-dark">
            <th scope="row" className="whitespace-nowrap bg-gray-200 px-6 py-4 font-medium text-gray-900 dark:bg-zinc-700 dark:text-white">
              <div className="h-4 w-1/2 rounded bg-gray-400 dark:bg-gray-500"></div>
            </th>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/3 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-3/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
          </tr>
          <tr className="!border-none bg-gray-200 dark:bg-dark">
            <th scope="row" className="whitespace-nowrap rounded-bl-md bg-gray-200 px-6 py-4 font-medium text-gray-900 dark:bg-zinc-700 dark:text-white">
              <div className="h-4 w-1/2 rounded bg-gray-400 dark:bg-gray-500"></div>
            </th>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-2/3 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
            <td className="rounded-br-md px-6 py-4 dark:bg-zinc-700">
              <div className="h-4 w-3/4 rounded bg-gray-400 dark:bg-gray-500"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeletonComponent;
