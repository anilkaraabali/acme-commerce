import { IncomingHttpHeaders } from 'http';

const getReferer = ({
  extraPath = '',
  headers,
  redirect,
}: {
  extraPath?: string;
  headers: IncomingHttpHeaders;
  redirect: string;
}) =>
  headers.referer?.includes(`${headers.host}${extraPath}`)
    ? headers.referer
    : redirect;

export { getReferer };
