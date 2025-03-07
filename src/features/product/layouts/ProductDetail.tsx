import { Reviews } from '@/components/reviews';
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
import { useCallback, useMemo, useState } from 'react';
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
import { ProductDetailData } from '../model';
import { productGetDiscountRate, productGetUtmParams } from '../utils';

const ShareAsync = dynamic(
  () => import('@/components/share').then((mod) => mod.Share),
  { ssr: false }
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

  const product = props.detailResult.product;

  // TODO[AC-1]: Implement gallery modal
  const [, setGalleryImageIndex] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState(
    product.variants.colors[0].id
  );
  const [selectedSizeId, setSelectedSizeId] = useState(
    product.variants.colors[0].sizes.find((size) => size.quantity > 0)?.id || ''
  );
  const [isShareClicked, setIsShareClicked] = useState(false);

  const discountRate = useMemo(
    () => productGetDiscountRate(product.price, product.salePrice),
    [product.price, product.salePrice]
  );
  const isOutOfStock = useMemo(
    () =>
      product.variants.colors
        .find((color) => color.id === selectedColorId)!
        .sizes.every((size) => size.quantity === 0),
    [product.variants.colors, selectedColorId]
  );

  const selectColor = useCallback(
    (id: string) => {
      setSelectedColorId(id);
      // Select the first available size of the selected color
      setSelectedSizeId(
        product.variants.colors
          .find((color) => color.id === id)!
          .sizes.find((size) => size.quantity > 0)!.id
      );
    },
    [product.variants.colors]
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

    if (userFavorites.includes(product.id)) {
      setUserFavorites(userFavorites.filter((id) => id !== product.id));
    } else {
      setUserFavorites([...userFavorites, product.id]);
    }
  }, [product.id, user, userFavorites]);

  const addToCart = useCallback(() => {
    if (!user) {
      return openAuthModal();
    }

    const selectedColor = product.variants.colors.find(
      (color) => color.id === selectedColorId
    )!;
    const selectedSize = selectedColor.sizes.find(
      (size) => size.id === selectedSizeId
    )!;

    alert(
      `🚧 Hold on, the cart's still under construction! 🛠️\n\n` +
        `${JSON.stringify(
          {
            color: selectedColor.name,
            pid: product.id,
            size: selectedSize.name,
          },
          null,
          2
        )}\n\n`
    );
  }, [product.id, product.variants.colors, selectedColorId, selectedSizeId]);

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
                <ProductDiscountBadge discountRate={discountRate} />
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
                  alt='Acme Store express'
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
                onSelectColor={(id) => selectColor(id)}
                selectedColorId={selectedColorId}
              />
              <ProductGridSizes
                onSelectSize={setSelectedSizeId}
                selectedSizeId={selectedSizeId}
                sizes={
                  product.variants.colors.find(
                    (color) => color.id === selectedColorId
                  )!.sizes
                }
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
                    {userFavorites.includes(product.id) ? (
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
              <Reviews
                average={4.5}
                classNames={{
                  base: 'mb-2',
                }}
                count={3}
                reviews={[]}
              />
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
