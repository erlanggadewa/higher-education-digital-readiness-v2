import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

function TabsFormGroupCampus() {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap justify-between space-x-2 rtl:space-x-reverse">
        <Tab as={Fragment}>
          {({ selected }) => (
            <div className="flex-auto text-center !outline-none">
              <button
                className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block w-full rounded p-3.5 py-2 before:inline-block hover:bg-teal-700 hover:text-white hover:duration-100`}
              >
                Home
              </button>
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div className="flex-auto text-center !outline-none">
              <button
                className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block w-full rounded p-3.5 py-2 before:inline-block hover:bg-teal-700 hover:text-white hover:duration-100`}
              >
                Profile
              </button>
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div className="flex-auto text-center !outline-none">
              <button
                className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block w-full rounded p-3.5 py-2 before:inline-block hover:bg-teal-700 hover:text-white hover:duration-100`}
              >
                Contact
              </button>
            </div>
          )}
        </Tab>
      </Tab.List>
    </Tab.Group>
  );
}

export default TabsFormGroupCampus;
