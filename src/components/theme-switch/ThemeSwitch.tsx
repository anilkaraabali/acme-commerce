import { Button, ButtonGroup } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { LiaDesktopSolid, LiaMoonSolid, LiaSunSolid } from 'react-icons/lia';

const ThemeSwitch: FC = () => {
  const t = useTranslations('Common');
  const { setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className='size-6' />;

  return (
    <ButtonGroup radius='full' variant='flat'>
      <Button
        aria-label={t('theme.light')}
        isIconOnly
        onPress={() => setTheme('light')}
        title={t('theme.light')}
      >
        <LiaSunSolid size={20} />
      </Button>
      <Button
        aria-label={t('theme.system')}
        isIconOnly
        onPress={() => setTheme('system')}
        title={t('theme.system')}
      >
        <LiaDesktopSolid size={20} />
      </Button>
      <Button
        aria-label={t('theme.dark')}
        isIconOnly
        onPress={() => setTheme('dark')}
        title={t('theme.dark')}
      >
        <LiaMoonSolid size={20} />
      </Button>
    </ButtonGroup>
  );
};

export { ThemeSwitch };
