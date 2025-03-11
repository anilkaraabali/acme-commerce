import { LayoutProps } from '@/types';
import { NextPage } from 'next';

import { PdfReader } from '../components/PdfReader';

interface PdfPageProps extends LayoutProps {
  fileName: string;
  title: string;
}

const PdfPage: NextPage<PdfPageProps> = ({ fileName, title }) => (
  <main>
    <h1 className='page-title text-center'>{title}</h1>
    <PdfReader fileName={fileName} />
  </main>
);

export default PdfPage;
export type { PdfPageProps };
