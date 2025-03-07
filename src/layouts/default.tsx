import { FC, PropsWithChildren } from 'react';

import { Footer } from './footer';
import { Header } from './header';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className='relative flex h-screen flex-col'>
    <Header />
    {children}
    <Footer />
  </div>
);

export { DefaultLayout };
