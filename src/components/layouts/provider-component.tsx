'use client';
import App from '@/App';
import Loading from '@/components/layouts/loading';
import store from '@/store';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App>{children} </App>
        </Suspense>
      </Provider>
    </SessionProvider>
  );
};

export default ProviderComponent;
