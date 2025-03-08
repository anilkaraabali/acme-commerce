import { SanitizeHtmlAsync } from '@/components/sanitize-html';
import { USER_FAVORITES_STORAGE_KEY, useAuth } from '@/features/auth';
import { useSticky } from '@/hooks';
import { LayoutProps } from '@/types';
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Link,
} from '@heroui/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LiaBell,
  LiaCartPlusSolid,
  LiaHeart,
  LiaHeartSolid,
  LiaPlusSolid,
} from 'react-icons/lia';
import { RxShare2 } from 'react-icons/rx';
import { useLocalStorage } from 'usehooks-ts';

import {
  ProductDiscountBadge,
  ProductGridColors,
  ProductGridGallery,
  ProductGridSizes,
  ProductPrice,
} from '../components';
import {
  ProductReviewsProvider,
  ProductReviewsSkeleton,
} from '../components/reviews';
import { ProductDetailData } from '../types';
import { productGetDiscountRate, productGetUtmParams } from '../utils';

const ShareAsync = dynamic(
  () => import('@/components/share').then((mod) => mod.Share),
  { ssr: false }
);

const ProductReviewsAsync = dynamic(
  () =>
    import('../components/reviews/ProductReviews').then(
      (mod) => mod.ProductReviews
    ),
  {
    loading: () => <ProductReviewsSkeleton />,
    ssr: false,
  }
);

interface ProductDetailProps extends LayoutProps {
  detailResult: ProductDetailData;
}

function ProductDetail(props: ProductDetailProps) {
  const t = useTranslations('Product');
  const [stickyRef, isSticky] = useSticky<HTMLDivElement>();
  const { openAuthModal, user } = useAuth();
  const [userFavorites, setUserFavorites] = useLocalStorage<string[]>(
    USER_FAVORITES_STORAGE_KEY,
    []
  );

  // TODO: Implement gallery modal
  const [, setGalleryImageIndex] = useState(0);
  const [isShareClicked, setIsShareClicked] = useState(false);

  const product = props.detailResult.product;

  const { activeColorVariant, isOutOfStock } = useMemo(() => {
    const variant = product.variants.colors.find(
      (color) => color.id === product.colorId
    )!;
    const outOfStock = variant.sizes.every((size) => size.quantity === 0);

    return { activeColorVariant: variant, isOutOfStock: outOfStock };
  }, [product.colorId, product.variants.colors]);

  const [selectedSizeId, setSelectedSizeId] = useState(
    activeColorVariant.sizes.find((size) => size.quantity > 0)?.id || ''
  );

  const discountRate = useMemo(
    () => productGetDiscountRate(product.price, product.salePrice),
    [product.price, product.salePrice]
  );

  const shareProduct = () => {
    const width = window.innerWidth;
    const isMobile = width <= 480 && /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile && !!navigator.share) {
      navigator
        .share({
          text: t('share.text'),
          title: t('share.title'),
          url: window.location.href + productGetUtmParams(),
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error sharing:', error);
        });
    } else {
      setIsShareClicked(true);
    }
  };

  const toggleFavorite = useCallback(() => {
    if (!user) {
      return openAuthModal();
    }

    setUserFavorites((prevFavorites) => {
      if (prevFavorites.includes(product.id)) {
        return prevFavorites.filter((id) => id !== product.id);
      }

      return [...prevFavorites, product.id];
    });
  }, [user, setUserFavorites, product.id]);

  const addToCart = useCallback(() => {
    if (isOutOfStock && !user) {
      return openAuthModal();
    }

    const selectedColorVariant = activeColorVariant;
    const selectedSize = selectedColorVariant.sizes.find(
      (size) => size.id === selectedSizeId
    )!;

    alert(
      `🚧 Hold on, the cart's still under construction! 🛠️\n\n` +
        `${JSON.stringify(
          {
            color: selectedColorVariant.name,
            colorId: selectedColorVariant.id,
            pid: product.id,
            size: selectedSize.name,
          },
          null,
          2
        )}\n\n`
    );
  }, [user, openAuthModal, activeColorVariant, selectedSizeId, product.id]);

  useEffect(() => {
    const sizeWithStock = activeColorVariant.sizes.find(
      (size) => size.quantity > 0
    );

    setSelectedSizeId(sizeWithStock?.id || '');
  }, [activeColorVariant]);

  return (
    <main>
      <div className='md:flex'>
        <div className='w-1/2 max-w-full shrink-0 grow-0'>
          <ProductGridGallery
            classNames={{
              list: 'pt-4',
            }}
            images={product.images}
            onImageClick={setGalleryImageIndex}
          />
        </div>
        <div
          className={clsx(
            'relative top-0 h-fit w-1/2 max-w-full shrink-0 grow-0 pl-4 pt-4',
            {
              sticky: isSticky,
            }
          )}
          ref={stickyRef}
        >
          <div className='mx-auto min-w-0 md:w-[320px] lg:w-[calc(100%-192px)] lg:min-w-[320px] lg:max-w-[458px]'>
            <div className='relative p-0 md:pb-8 md:pt-16 lg:pt-24'>
              {discountRate && (
                <ProductDiscountBadge
                  classNames={{
                    base: 'mb-4',
                  }}
                  discountRate={discountRate}
                />
              )}
              <div className='flex flex-col pr-6'>
                <h1 className='uppercase'>{product.title}</h1>
              </div>
              <ProductPrice
                classNames={{
                  base: 'text-base',
                }}
                price={product.price}
                salePrice={product.salePrice}
              />
              <Link
                as={NextLink}
                className='text-[10px]'
                color='foreground'
                href='/shop-guide'
                target='_blank'
              >
                {t('vatInfo')}
              </Link>
              <div className='mt-4 flex items-center gap-2'>
                <Image
                  alt='Acme express'
                  height={26}
                  src='/icons/fulfilment_express.svg'
                  width={81}
                />
                <p className='text-xs'>
                  {t('arrivalDate', {
                    date: dayjs(product.estimatedDeliveryDate).format(
                      'dddd, MMMM D'
                    ),
                  })}
                </p>
              </div>
              <ProductGridColors
                colors={product.variants.colors}
                selectedColorId={product.colorId}
              />
              <ProductGridSizes
                onSelectSize={setSelectedSizeId}
                selectedSizeId={selectedSizeId}
                sizes={activeColorVariant.sizes}
              />
              <div className='mb-10 mt-2 flex gap-2'>
                <Button
                  className='uppercase'
                  color='primary'
                  disabled={isOutOfStock}
                  endContent={
                    isOutOfStock ? (
                      <LiaBell size={20} />
                    ) : (
                      <LiaCartPlusSolid size={20} />
                    )
                  }
                  fullWidth
                  onPress={addToCart}
                  radius='none'
                  size='lg'
                >
                  {isOutOfStock ? t('cta.notifyMe') : t('cta.addToCart')}
                </Button>
                <ButtonGroup color='default' size='lg' variant='ghost'>
                  <Button isIconOnly onPress={toggleFavorite} radius='none'>
                    {!!user && userFavorites.includes(product.id) ? (
                      <LiaHeartSolid className='text-red-500' size={20} />
                    ) : (
                      <LiaHeart size={20} />
                    )}
                  </Button>
                  <Button isIconOnly onPress={shareProduct} radius='none'>
                    <RxShare2 size={20} />
                  </Button>
                </ButtonGroup>
              </div>
              <ProductReviewsProvider productId={product.id}>
                <ProductReviewsAsync
                  classNames={{
                    base: 'mb-2',
                  }}
                  productId={product.id}
                />
              </ProductReviewsProvider>
              <Accordion data-testid='product-details'>
                <AccordionItem
                  aria-label={t('details.description')}
                  as='div'
                  data-testid='product-description'
                  indicator={<LiaPlusSolid className='text-foreground' />}
                  key='1'
                  title={t('details.description')}
                >
                  <SanitizeHtmlAsync text={product.description} />
                </AccordionItem>
                <AccordionItem
                  aria-label={t('details.materials')}
                  as='div'
                  data-testid='product-materials'
                  indicator={<LiaPlusSolid className='text-foreground' />}
                  key='2'
                  title={t('details.materials')}
                >
                  <SanitizeHtmlAsync text={product.materials} />
                </AccordionItem>
                <AccordionItem
                  aria-label={t('details.careGuide')}
                  as='div'
                  data-testid='product-care-guide'
                  indicator={<LiaPlusSolid className='text-foreground' />}
                  key='3'
                  title={t('details.careGuide')}
                >
                  <SanitizeHtmlAsync text={product.careInstructions} />
                </AccordionItem>
                <AccordionItem
                  aria-label={t('details.shipping')}
                  as='div'
                  data-testid='product-shipping'
                  indicator={<LiaPlusSolid className='text-foreground' />}
                  key='4'
                  title={t('details.shipping')}
                >
                  <SanitizeHtmlAsync text={t.raw('details.shippingInfo')} />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      {isShareClicked && (
        <ShareAsync
          campaign='productShare'
          isOpen={isShareClicked}
          onOpenChange={() => setIsShareClicked(false)}
        />
      )}
    </main>
  );
}

export type { ProductDetailProps };
export default ProductDetail;
