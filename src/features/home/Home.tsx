import { LayoutProps } from '@/types';

import { Hero } from './Hero';

interface HomeProps extends LayoutProps {}

function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

export type { HomeProps };
export default Home;
