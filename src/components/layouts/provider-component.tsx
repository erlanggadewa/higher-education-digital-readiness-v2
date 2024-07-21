'use client';
import App from '@/App';
import store from '@/store';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <App>{children} </App>
      </Provider>
    </SessionProvider>
  );
};

export default ProviderComponent;
