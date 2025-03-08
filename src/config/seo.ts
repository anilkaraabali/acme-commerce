import { NextSeoProps } from 'next-seo';

const seoConfig: NextSeoProps = {
  description:
    "Acme is your shopping destination for fashion, home, beauty, kids' clothes and more. Browse the latest collections and find quality pieces at affordable prices.",
  openGraph: {
    description:
      "Acme is your shopping destination for fashion, home, beauty, kids' clothes and more. Browse the latest collections and find quality pieces at affordable prices.",
    images: [
      {
        height: 630,
        type: 'image/png',
        url: 'https://commerce-shopify-l1tiqh7el-vercel-solutions-vtest314.vercel.app/opengraph-image?376fa9d8052ebb8e',
        width: 1200,
      },
    ],
    locale: 'en_IE',
    site_name: 'Acme',
    title: 'Acme | Online Fashion, Homeware & Kids Clothes',
    type: 'website',
    url: 'https://nextjs.org/commerce',
  },
  title: 'Acme | Online Fashion, Homeware & Kids Clothes',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@handle',
    site: 'https://nextjs.org/commerce',
  },
};

export { seoConfig };
