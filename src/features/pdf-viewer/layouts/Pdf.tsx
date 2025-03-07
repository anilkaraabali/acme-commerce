import { LayoutProps } from '@/types';

import { PdfViewer } from '../components/PdfViewer';

interface PdfProps extends LayoutProps {
  fileName: string;
  title: string;
}

function Pdf({ fileName, title }: PdfProps) {
  return <PdfViewer fileName={fileName} title={title} />;
}

export default Pdf;
export type { PdfProps };
