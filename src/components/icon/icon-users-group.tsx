import { type FC } from 'react';

interface IconUsersGroupProps {
  className?: string;
}

const IconUsersGroup: FC<IconUsersGroupProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" className={className}>
      <path
        fill="currentColor"
        d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.48 6.48 0 0 0-1.905 3.959q-.034.335.025.654a5 5 0 0 1-2.07-.655m14.95.654a5 5 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.48 6.48 0 0 1 1.907 3.96a2.3 2.3 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.84.84 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.84.84 0 0 1-.277.71A6.98 6.98 0 0 1 10 18a6.97 6.97 0 0 1-4.696-1.81"
      ></path>
    </svg>
  );
};

export default IconUsersGroup;
