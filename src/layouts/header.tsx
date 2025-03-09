import { Logo } from '@/components/logo';
import { siteConfig } from '@/config';
import { useAuth } from '@/features/auth';
import { DynamicTranslationKey } from '@/types';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@heroui/navbar';
import { Button, addToast } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LiaHeart, LiaShoppingCartSolid, LiaUserSolid } from 'react-icons/lia';

const pathToMenuMap = new Map<string, string>([
  ['/home', 'home'],
  ['/kids', 'kids'],
  ['/ladies', 'women'],
  ['/men', 'men'],
]);

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      classNames={{
        wrapper: 'max-w-none',
      }}
      isMenuOpen={isMenuOpen}
      maxWidth='xl'
      onMenuOpenChange={setIsMenuOpen}
    >
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
          <NavbarItem
            isActive={
              pathToMenuMap.get(router.pathname) === item.translationKey
            }
            key={item.href}
          >
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
        <Button
          as={NextLink}
          href={user ? '/account' : '/auth/signin'}
          isIconOnly
          variant='light'
        >
          <LiaUserSolid size={20} />
        </Button>
        <Button as={NextLink} href='/favourites' isIconOnly variant='light'>
          <LiaHeart size={20} />
        </Button>
        {/* TODO: Implement cart pages */}
        <Button
          href='/cart'
          isIconOnly
          onPress={() =>
            addToast({
              color: 'primary',
              severity: 'primary',
              title: "🚧 Hold on, the cart's still under construction!",
            })
          }
          variant='light'
        >
          <LiaShoppingCartSolid size={20} />
        </Button>
      </NavbarContent>
      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem
              isActive={
                pathToMenuMap.get(router.pathname) === item.translationKey
              }
              key={`${item}-${index}`}
            >
              <NextLink
                className='data-[active=true]:text-primary'
                color='foreground'
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(
                  `Common.menu.${item.translationKey}` as DynamicTranslationKey
                )}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export { Header };
