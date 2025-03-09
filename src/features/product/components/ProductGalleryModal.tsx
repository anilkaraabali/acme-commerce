import { Modal, ModalBody, ModalContent } from '@heroui/react';
import Image from 'next/image';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Product } from '../types';

interface ProductGalleryModalProps {
  classNames?: {
    image?: string;
    root?: string;
  };
  images: Product['images'];
  initialIndex: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ProductGalleryModal: FC<ProductGalleryModalProps> = ({
  classNames,
  images,
  initialIndex,
  isOpen,
  onOpenChange,
}) => (
  <Modal
    classNames={{
      base: 'overflow-y-auto',
    }}
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    size='full'
  >
    <ModalContent>
      {() => (
        <>
          <ModalBody className='justify-center'>
            <Carousel
              className={classNames?.root}
              renderThumbs={() =>
                images.map((image) => (
                  <Image
                    alt={image.alt}
                    className={classNames?.image}
                    height={image.height}
                    key={image.url}
                    src={image.url}
                    width={image.width}
                  />
                ))
              }
              selectedItem={initialIndex}
              useKeyboardArrows
            >
              {images.map((image, index) => (
                <Image
                  alt={image.alt}
                  className={classNames?.image}
                  height={image.height}
                  key={image.url}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                  src={image.url}
                  width={image.width}
                />
              ))}
            </Carousel>
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
);

export type { ProductGalleryModalProps };
export { ProductGalleryModal };
