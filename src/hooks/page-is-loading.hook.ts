import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePageIsLoading = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onRouteChangeStart = () => setIsLoading(true);
    const onRouteChangeComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    router.events.on('routeChangeError', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
      router.events.off('routeChangeError', onRouteChangeComplete);
    };
  }, []);

  return isLoading;
};

export { usePageIsLoading };
