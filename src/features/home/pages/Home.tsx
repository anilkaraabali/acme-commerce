import { LayoutProps } from '@/types';
import { NextPage } from 'next';

import { HomeHero } from '../components';

interface HomeProps extends LayoutProps {}

const Home: NextPage<HomeProps> = () => (
  <main>
    <HomeHero />
  </main>
);

export type { HomeProps };
export default Home;
