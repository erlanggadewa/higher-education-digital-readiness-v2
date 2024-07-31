'use client';
import App from '@/App';
import store from '@/store';
import { SessionProvider } from 'next-auth/react';
import { Suspense, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import Loading from './loading';

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <SessionProvider>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <App>{children} </App>
        </Provider>
      </Suspense>
    </SessionProvider>
  );
};

export default ProviderComponent;
