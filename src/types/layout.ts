import { Session } from 'next-auth';
import { AbstractIntlMessages } from 'next-intl';

interface LayoutProps {
  messages: AbstractIntlMessages;
  session: Session | null;
}

export type { LayoutProps };
