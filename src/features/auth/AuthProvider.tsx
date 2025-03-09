import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { PRODUCT_REVIEWS_STORAGE_KEY } from '../product/constants';
import { ProductReviewsMap } from '../product/types';
import { IUser } from './user';

interface AuthContextType {
  openAuthModal: () => void;
  user: IUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LazyAuthFeaturesModal = dynamic(
  () => import('./FeaturesModal').then((mod) => mod.AuthFeaturesModal),
  { ssr: false }
);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { data } = useSession();
  const productReviews = useReadLocalStorage<ProductReviewsMap>(
    PRODUCT_REVIEWS_STORAGE_KEY
  );
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);

  const openAuthModal = () => setIsOpen(true);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const userReviews = useMemo(
    () =>
      user
        ? Object.values(productReviews ?? {})
            .flat()
            .filter((review) => review.userId === user?.id)
        : [],
    [productReviews, user]
  );

  return (
    <AuthContext.Provider
      value={{
        openAuthModal,
        user: user
          ? {
              ...user,
              reviews: userReviews.length ? userReviews : [],
            }
          : null,
      }}
    >
      {children}
      {isOpen && (
        <LazyAuthFeaturesModal isOpen={isOpen} onOpenChange={setIsOpen} />
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
