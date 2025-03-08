import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IUser } from './user';

interface AuthContextType {
  openAuthModal: () => void;
  user: IUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthFeaturesModalAsync = dynamic(
  () => import('./FeaturesModal').then((mod) => mod.AuthFeaturesModal),
  { ssr: false }
);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { data } = useSession();

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

  return (
    <AuthContext.Provider value={{ openAuthModal, user: data?.user || null }}>
      {children}
      {isOpen && (
        <AuthFeaturesModalAsync isOpen={isOpen} onOpenChange={setIsOpen} />
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
