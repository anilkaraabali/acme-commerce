import { DynamicTranslationKey } from '@/types';
import { Modal, ModalBody, ModalContent, addToast } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useState } from 'react';
import { GoLink } from 'react-icons/go';
import { LiaEnvelope, LiaFacebookF, LiaWhatsapp } from 'react-icons/lia';
import { RiTwitterXFill } from 'react-icons/ri';

interface ShareProps {
  campaign: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

const generateShareUrl = (platform: string, currentUrl: string) => {
  const encodedUrl = encodeURIComponent(currentUrl);

  switch (platform) {
    case 'mail':
      return `mailto:?subject=Check%20this%20out&body=${encodedUrl}&content=email`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&content=fb`;
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedUrl}&content=wa`;
    case 'x':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=Check%20this%20out%20on%20X!&content=tw`;
    default:
      return '';
  }
};

const Share: FC<ShareProps> = ({ campaign, isOpen, onOpenChange }) => {
  const t = useTranslations('Common');

  const [utmParams, setUtmParams] = useState('');

  useEffect(() => {
    const getPlatform = () => {
      const width = window.innerWidth;

      if (width <= 480) return 'mobile';
      if (width <= 1024) return 'tablet';

      return 'desktop';
    };

    const updateUtmParams = () => {
      const platform = getPlatform();

      setUtmParams(
        `?utm_campaign=${campaign}&utm_medium=web_${platform}&utm_source=sharing`
      );
    };

    updateUtmParams();

    window.addEventListener('resize', updateUtmParams);

    return () => {
      window.removeEventListener('resize', updateUtmParams);
    };
  }, []);

  const currentUrl = window.location.href + utmParams;

  const copyLinkToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        addToast({
          shouldShowTimeoutProgress: true,
          timeout: 3000,
          title: t('share.copiedToClipboard'),
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to copy the URL:', error);
      });
  }, [currentUrl]);

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='bottom'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <ul className='flex flex-col gap-2'>
                {['facebook', 'whatsapp', 'x', 'mail'].map((platform) => {
                  const title = t(`share.${platform}` as DynamicTranslationKey);

                  return (
                    <li className='border-t first:border-none' key={platform}>
                      <a
                        aria-label={title}
                        className='flex h-10 w-full items-center justify-between text-xs capitalize hover:text-default-500'
                        href={generateShareUrl(platform, currentUrl)}
                        onClick={onClose}
                        target='_blank'
                        title={title}
                      >
                        {platform}
                        {platform === 'facebook' && <LiaFacebookF size={16} />}
                        {platform === 'whatsapp' && <LiaWhatsapp size={16} />}
                        {platform === 'x' && <RiTwitterXFill size={16} />}
                        {platform === 'mail' && <LiaEnvelope size={16} />}
                      </a>
                    </li>
                  );
                })}
                <li className='border-t'>
                  <button
                    className='flex h-10 w-full items-center justify-between text-xs hover:text-default-500'
                    onClick={() => {
                      onClose();
                      copyLinkToClipboard();
                    }}
                  >
                    {t('share.copyLink')}
                    <GoLink size={16} />
                  </button>
                </li>
              </ul>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export { Share };
