import { Error, ErrorProps } from '@/components/error';
import { LocaleType } from '@/types';
import { getMessages } from '@/utils';
import { NextPage } from 'next';

const CustomError: NextPage<ErrorProps> = (props) => <Error {...props} />;

CustomError.getInitialProps = async ({
  err,
  locale,
  req,
  res,
}): Promise<ErrorProps> => {
  if (req) {
    const statusCode = res?.statusCode || 500;
    const errorMessage = err?.message || 'Unknown error';

    if (statusCode >= 500) {
      // eslint-disable-next-line no-console
      console.error('[Server Error]', {
        errorMessage,
        statusCode,
        url: req.url,
      });
    }
  }

  return {
    messages: await getMessages(locale as LocaleType, ['Error']),
    statusCode: res?.statusCode || 500,
  };
};

export default CustomError;
