import { Avatar } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface UserAvatarProps {
  name: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ name }) => {
  const t = useTranslations('Auth');

  const getInitials = (name: string = '') => {
    if (!name) return '';

    return name
      .split(' ')
      .map((part) => part[0].toUpperCase())
      .join('');
  };

  return (
    <NextLink
      aria-label={t('profile.link.ariaLabel')}
      href='/account'
      title={t('profile.link.title')}
    >
      <Avatar name={getInitials(name)} />
    </NextLink>
  );
};

export type { UserAvatarProps };
export { UserAvatar };
