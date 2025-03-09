import { siteConfig } from '@/config';
import { DynamicTranslationKey } from '@/types';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  useDisclosure,
} from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { LiaMinusSolid, LiaPlusSolid } from 'react-icons/lia';

const HomeHero: FC = () => {
  const t = useTranslations();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section
      className='relative flex min-h-[500px] flex-col'
      id='hero'
      style={{
        maxHeight: 'calc(-64px + 100svh)',
      }}
    >
      <h1 className='clip-rect-0 absolute -m-px size-px overflow-hidden p-0'>
        {t('Home.hero.title')}
      </h1>
      <div className='aspect-9-16 relative flex w-full items-center justify-between overflow-hidden bg-content2'>
        <button className='absolute inset-0 z-10 size-full' onClick={onOpen} />
        <div className='flex items-center p-4 lg:p-6'>
          <h2
            className='text-5xl font-bold uppercase text-foreground lg:text-8xl'
            dangerouslySetInnerHTML={{ __html: t.raw('Home.hero.headline') }}
          />
        </div>
      </div>

      <div className='flex items-center px-6 py-4'>
        <Button
          className='ml-auto uppercase'
          endContent={isOpen ? <LiaMinusSolid /> : <LiaPlusSolid />}
          onPress={onOpen}
          variant='light'
        >
          {t('Home.hero.shopNow')}
        </Button>
      </div>
      {isOpen && (
        <Drawer
          classNames={{
            base: 'w-full max-w-[360px] left-auto',
          }}
          hideCloseButton
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement='bottom'
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerBody>
                  {siteConfig.navMenuItems.map((item) => (
                    <NextLink
                      className='text-left data-[active=true]:text-primary'
                      color='foreground'
                      href={item.href}
                      key={item.href}
                      onClick={onClose}
                    >
                      {t(
                        `Common.menu.${item.translationKey}` as DynamicTranslationKey
                      )}
                    </NextLink>
                  ))}
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </section>
  );
};

export { HomeHero };
