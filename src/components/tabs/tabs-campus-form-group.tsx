'use client';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

function TabsCampusFormGroup({ tabs, setSelectedTab }: { tabs: { id: string; alias: string; name: string; description: string }[]; setSelectedTab: (value: string) => void }) {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap justify-between gap-3 rtl:space-x-reverse">
        {tabs.map((tab, index) => (
          <Tab key={index} as={Fragment}>
            {({ selected }) => (
              <div className="flex-auto text-center !outline-none">
                <button
                  className={`${selected ? 'bg-primary text-white !outline-none' : 'bg-slate-100 ring ring-slate-200 dark:bg-dark dark:ring-dark-dark-light'} -mb-[1px] block w-full rounded p-3.5 py-2 font-medium transition duration-150 ease-in-out before:inline-block hover:bg-teal-700 hover:text-white hover:duration-100 dark:hover:bg-teal-700`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.alias}
                </button>
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab, index) => (
          <Tab.Panel key={index} as={Fragment}>
            <div className="active pt-5">
              <h1 className="mb-2 text-lg font-bold">{tab.name}</h1>
              <p className="mb-2">{tab.description}</p>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default TabsCampusFormGroup;
