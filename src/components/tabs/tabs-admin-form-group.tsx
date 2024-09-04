import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

const tabs = ['Semua', 'Telah Mengisi', 'Belum Mengisi', 'Telah Direview', 'Sedang Direview', 'Belum Direview'];

function TabsFormGroup({ setSelectedTab }: { setSelectedTab: (value: string) => void }) {
  return (
    <Tab.Group>
      <Tab.List className="my-3 flex flex-wrap gap-3 rtl:space-x-reverse">
        {tabs.map((tab, index) => (
          <Tab key={`tab-${index}`} as={Fragment}>
            {({ selected }) => (
              <button
                className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}

export default TabsFormGroup;
