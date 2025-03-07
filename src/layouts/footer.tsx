import { LanguageSwitch } from '@/components/language-switch';
import { Logo } from '@/components/logo';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config';
import { DynamicTranslationKey } from '@/types';
import { Link } from '@heroui/link';
import { Divider } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const Footer: FC = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='mx-auto mt-auto flex h-auto w-full justify-center'>
      <div className='flex w-full max-w-7xl flex-col px-6 pb-8 pt-24'>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-8'>
          <div className='flex basis-4/12 flex-col gap-4'>
            <Logo />
            <p className='text-balance'>{t('tagline')}</p>
            <div className='flex gap-4'>
              {siteConfig.socialItems.map((item, index) => (
                <Link
                  className='text-current'
                  href={item.href}
                  isExternal
                  key={index}
                  title={item.title}
                  underline='hover'
                >
                  {<item.icon size={24} />}
                </Link>
              ))}
            </div>
          </div>
          <div className='mt-16 flex flex-1 flex-col gap-8 sm:flex-row lg:mt-0'>
            <div className='flex flex-1 gap-8'>
              {siteConfig.footerItems.slice(0, 2).map((item, index) => (
                <div className='flex flex-1 flex-col gap-4' key={index}>
                  <h3 className='text-sm font-bold'>
                    {t(`${item.translationKey}` as DynamicTranslationKey)}
                  </h3>
                  {item.children.map((link, index) => {
                    const title = t(
                      `${link.translationKey}` as DynamicTranslationKey
                    );

                    return (
                      <Link
                        className='text-current'
                        href={link.href}
                        isExternal
                        key={index}
                        size='sm'
                        title={title}
                        underline='hover'
                      >
                        {title}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className='flex flex-1 gap-8'>
              {siteConfig.footerItems
                .slice(2, siteConfig.footerItems.length)
                .map((item, index) => (
                  <div className='flex flex-1 flex-col gap-4' key={index}>
                    <h3 className='text-sm font-bold'>
                      {t(`${item.translationKey}` as DynamicTranslationKey)}
                    </h3>
                    {item.children.map((link, index) => {
                      const title = t(
                        `${link.translationKey}` as DynamicTranslationKey
                      );

                      return (
                        <Link
                          className='text-current'
                          href={link.href}
                          isExternal
                          key={index}
                          size='sm'
                          title={title}
                          underline='hover'
                        >
                          {title}
                        </Link>
                      );
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Divider className='mb-8 mt-12' />
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <p className='text-sm'>{t('copyright')}</p>
          <div className='flex items-center gap-4'>
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
