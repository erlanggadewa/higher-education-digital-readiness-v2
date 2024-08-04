import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

const tabs = [
  {
    value: 'Semua',
  },
  {
    value: 'Belum Direview',
  },
  {
    value: 'Sedang Direview',
  },
  {
    value: 'Sudah Direview',
  },
];

function TabsFormGroupCampus({ setSelectedTab }: { setSelectedTab: (value: 'Sedang Direview' | 'Belum Direview' | 'Sudah Direview' | 'Semua') => void }) {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap justify-between gap-3 rtl:space-x-reverse">
        {tabs.map((tab, index) => (
          <Tab key={index} as={Fragment}>
            {({ selected }) => (
              <div className="flex-auto text-center !outline-none">
                <button
                  className={`${selected ? 'bg-primary text-white !outline-none' : 'bg-slate-100 ring ring-slate-200 dark:bg-dark dark:ring-dark-dark-light'} -mb-[1px] block w-full rounded p-3.5 py-2 font-medium transition duration-150 ease-in-out before:inline-block hover:bg-teal-700 hover:text-white hover:duration-100 dark:hover:bg-teal-700`}
                  onClick={() => setSelectedTab(tab.value as 'Sedang Direview' | 'Belum Direview' | 'Sudah Direview' | 'Semua')}
                >
                  {tab.value}
                </button>
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}

export default TabsFormGroupCampus;
