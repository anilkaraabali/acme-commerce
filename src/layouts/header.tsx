import { Logo } from '@/components/logo';
import { siteConfig } from '@/config';
import { useAuth } from '@/features/auth';
import { UserAvatar } from '@/features/auth/user/Avatar';
import { DynamicTranslationKey } from '@/types';
import { Link } from '@heroui/link';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@heroui/navbar';
import { Button } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LiaArrowRightSolid } from 'react-icons/lia';

const Header = () => {
  const t = useTranslations();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar maxWidth='xl' onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='md:hidden'
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden gap-8 md:flex' justify='center'>
        {siteConfig.navMenuItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className='data-[active=true]:text-primary'
              color='foreground'
              href={item.href}
            >
              {t(`Common.menu.${item.translationKey}` as DynamicTranslationKey)}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        {user?.name ? (
          <UserAvatar name={user.name} />
        ) : (
          <Button
            as={NextLink}
            color='primary'
            endContent={<LiaArrowRightSolid size={20} />}
            href='/auth/signin'
            variant='shadow'
          >
            {t('Common.cta.signIn')}
          </Button>
        )}
      </NavbarContent>
      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color='foreground' href='#' size='lg'>
                {t(
                  `Common.menu.${item.translationKey}` as DynamicTranslationKey
                )}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export { Header };
