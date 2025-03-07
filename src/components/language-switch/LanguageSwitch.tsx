import {
  Button,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { LiaAngleDownSolid, LiaGlobeSolid } from 'react-icons/lia';

const locales = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Türkçe',
    value: 'tr',
  },
];

interface LanguageSwitchProps {
  triggerButtonProps?: React.ComponentProps<typeof Button>;
}

const LanguageSwitch: FC<LanguageSwitchProps> = ({ triggerButtonProps }) => {
  const t = useTranslations('Common');
  const { locale, route } = useRouter();

  const activeLocale = locales.find((l) => l.value === locale);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          aria-label={t('languageSwitch.button.ariaLabel')}
          endContent={<LiaAngleDownSolid size={16} />}
          startContent={<LiaGlobeSolid size={24} />}
          title={t('languageSwitch.button.title')}
          variant='bordered'
          {...triggerButtonProps}
        >
          {activeLocale?.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t('languageSwitch.menu.ariaLabel')}
        id='language-dropdown-menu'
        variant='faded'
      >
        {locales.map((locale) => (
          <DropdownItem
            aria-label={locale.label}
            as={NextLink}
            href={route}
            isDisabled={locale.value === 'tr'}
            key={locale.value}
            startContent={<LiaGlobeSolid size={24} />}
            title={
              <>
                {locale.label}{' '}
                {locale.value !== 'en' && (
                  <Code color='secondary'>{t('comingSoon')}</Code>
                )}
              </>
            }
            variant='flat'
          />
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export type { LanguageSwitchProps };
export { LanguageSwitch };
