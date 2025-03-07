import {
  LiaFacebook,
  LiaGithub,
  LiaInstagram,
  LiaYoutube,
} from 'react-icons/lia';

type SiteConfig = typeof siteConfig;

const siteConfig = {
  footerItems: [
    {
      children: [
        {
          href: '/ladies',
          translationKey: 'women',
        },
        {
          href: '/men',
          translationKey: 'men',
        },
        {
          href: '/kids',
          translationKey: 'kids',
        },
        {
          href: '/home',
          translationKey: 'home',
        },
      ],
      translationKey: 'shop',
    },
    {
      children: [
        {
          href: '#',
          translationKey: 'careers',
        },
        {
          href: '#',
          translationKey: 'about',
        },
        {
          href: '#',
          translationKey: 'sustainability',
        },
        {
          href: '#',
          translationKey: 'press',
        },
      ],
      translationKey: 'corpareteInfo',
    },
    {
      children: [
        {
          href: '#',
          translationKey: 'customerService',
        },
        {
          href: '#',
          translationKey: 'storeLocator',
        },
        {
          href: '#',
          translationKey: 'giftCards',
        },
      ],
      translationKey: 'help',
    },
    {
      children: [
        {
          href: '#',
          translationKey: 'termsOfService',
        },
        {
          href: '#',
          translationKey: 'privacyPolicy',
        },
        {
          href: '#',
          translationKey: 'license',
        },
      ],
      translationKey: 'legal',
    },
  ],
  navMenuItems: [
    {
      children: [],
      href: '/ladies',
      translationKey: 'women',
    },
    {
      children: [],
      href: '/men',
      translationKey: 'men',
    },
    {
      children: [],
      href: '/kids',
      translationKey: 'kids',
    },
    {
      children: [],
      href: '/home',
      translationKey: 'home',
    },
  ],
  socialItems: [
    {
      href: '#',
      icon: LiaFacebook,
      title: 'Facebook',
    },
    {
      href: '#',
      icon: LiaInstagram,
      title: 'Instagram',
    },
    {
      href: '#',
      icon: LiaYoutube,
      title: 'Youtube',
    },
    {
      href: '#',
      icon: LiaGithub,
      title: 'GitHub',
    },
  ],
};

export type { SiteConfig };
export { siteConfig };
