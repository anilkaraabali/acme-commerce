import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@heroui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface AuthFeaturesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AuthFeaturesModal: FC<AuthFeaturesModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const t = useTranslations();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <Image
                alt='Illustration representing the sign-up process.'
                height={276}
                src='/illustrations/login.webp'
                width={512}
              />
              <h2 className='mb-4 text-center text-base'>
                {t('Auth.featureModal.description')}
              </h2>
              <ul className='flex list-disc flex-col gap-2 pl-6'>
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Auth.featureModal.saveFavorites'),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Auth.featureModal.fastOrderTracking'),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Auth.featureModal.exclusiveDiscounts'),
                  }}
                />
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onPress={onClose} variant='light'>
                {t('Common.cta.noThanks')}
              </Button>
              <Button as={NextLink} color='primary' href='/auth/signin'>
                {t('Common.cta.signIn')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export type { AuthFeaturesModalProps };
export { AuthFeaturesModal };
