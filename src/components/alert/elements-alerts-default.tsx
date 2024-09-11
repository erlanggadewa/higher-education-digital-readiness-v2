import { cn } from '@/utils/cn';
import IconBell from '../icon/icon-bell';
import IconChecks from '../icon/icon-checks';
import IconDanger from '../icon/icon-danger';
import IconInfoCircle from '../icon/icon-info-circle';

function DefaultAlertComponent({ message, type }: { message: string; type: 'danger' | 'success' | 'warning' | 'info' }) {
  return (
    <>
      {type === 'danger' ? (
        <div
          className={cn(
            'relative flex items-center rounded border border-danger bg-danger p-2 text-white before:absolute before:top-1/2 before:-mt-2 before:inline-block before:border-b-8 before:border-r-8 before:border-t-8 before:border-b-transparent before:border-r-inherit before:border-t-transparent dark:bg-danger-old ltr:border-r-[61px] ltr:before:right-0 rtl:border-l-[61px] rtl:before:left-0 rtl:before:rotate-180',
          )}
        >
          <span className="absolute inset-y-0 m-auto h-6 w-6 text-white ltr:-right-11 rtl:-left-11">
            <IconDanger className="h-full w-full" />
          </span>
          <span className="font-medium ltr:pr-2 rtl:pl-2">
            <strong className="ltr:mr-1 rtl:ml-1">Gagal!</strong>
            {message}.
          </span>
        </div>
      ) : type === 'success' ? (
        <div
          className={cn(
            'relative flex items-center rounded border border-success bg-success p-2 text-white before:absolute before:top-1/2 before:-mt-2 before:inline-block before:border-b-8 before:border-r-8 before:border-t-8 before:border-b-transparent before:border-r-inherit before:border-t-transparent dark:bg-success-old ltr:border-r-[61px] ltr:before:right-0 rtl:border-l-[61px] rtl:before:left-0 rtl:before:rotate-180',
          )}
        >
          <span className="absolute inset-y-0 m-auto h-6 w-6 text-white ltr:-right-11 rtl:-left-11">
            <IconChecks className="h-full w-full" />
          </span>
          <span className="font-medium ltr:pr-2 rtl:pl-2">
            <strong className="ltr:mr-1 rtl:ml-1">Berhasil!</strong>
            {message}
          </span>
        </div>
      ) : type === 'warning' ? (
        <div
          className={cn(
            'relative flex items-center rounded border border-warning bg-warning p-2 text-white before:absolute before:top-1/2 before:-mt-2 before:inline-block before:border-b-8 before:border-r-8 before:border-t-8 before:border-b-transparent before:border-r-inherit before:border-t-transparent dark:bg-warning-old ltr:border-r-[61px] ltr:before:right-0 rtl:border-l-[61px] rtl:before:left-0 rtl:before:rotate-180',
          )}
        >
          <span className="absolute inset-y-0 m-auto h-6 w-6 text-white ltr:-right-11 rtl:-left-11">
            <IconBell className="h-full w-full" />
          </span>
          <span className="font-medium ltr:pr-2 rtl:pl-2">
            <strong className="ltr:mr-1 rtl:ml-1">Perhatian!</strong>
            {message}
          </span>
        </div>
      ) : type === 'info' ? (
        <div
          className={cn(
            'relative flex items-center rounded border border-info bg-info p-2 text-white before:absolute before:top-1/2 before:-mt-2 before:inline-block before:border-b-8 before:border-r-8 before:border-t-8 before:border-b-transparent before:border-r-inherit before:border-t-transparent dark:bg-info-old ltr:border-r-[61px] ltr:before:right-0 rtl:border-l-[61px] rtl:before:left-0 rtl:before:rotate-180',
          )}
        >
          <span className="absolute inset-y-0 m-auto h-6 w-6 text-white ltr:-right-11 rtl:-left-11">
            <IconInfoCircle className="h-full w-full stroke-[100px] text-white" />
          </span>
          <span className="font-medium ltr:pr-2 rtl:pl-2">
            <strong className="ltr:mr-1 rtl:ml-1">Info!</strong>
            {message}
          </span>
        </div>
      ) : null}
    </>
  );
}

export default DefaultAlertComponent;
