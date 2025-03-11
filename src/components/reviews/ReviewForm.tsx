import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  addToast,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ReactStars from 'react-stars';
import { ZodType, z } from 'zod';

type FormData = {
  comment: string;
  rating: number;
};

interface ReviewFormProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (formData: FormData) => void;
}

const ReviewForm: FC<ReviewFormProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const t = useTranslations('Common');

  const [isLoading, setIsLoading] = useState(false);

  const schema: ZodType<FormData> = z.object({
    comment: z
      .string()
      .nonempty({ message: t('reviews.form.comment.required') }),
    rating: z.number().min(1, { message: t('reviews.form.rating.required') }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      comment: '',
      rating: 0,
    },
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      onSubmit(data);
      addToast({
        description: t('reviews.form.success.description'),
        severity: 'success',
        shouldShowTimeoutProgress: true,
        timeout: 3000,
        title: t('reviews.form.success.title'),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Review form submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      data-testid='reviews-form-modal'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {t('reviews.form.title')}
            </ModalHeader>
            <ModalBody>
              <p className='text-sm'>{t('reviews.form.description')}</p>
              <Form
                className='items-stretch gap-4'
                onSubmit={() => {
                  handleSubmit(handleFormSubmit)();
                  onClose();
                }}
                validationBehavior='aria'
              >
                <Controller
                  control={control}
                  name='comment'
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      errorMessage={errors.comment?.message}
                      isInvalid={!!errors.comment?.message}
                      isRequired
                      label={t('reviews.form.comment.label')}
                      placeholder={t('reviews.form.comment.placeholder')}
                      size='lg'
                      variant='faded'
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='rating'
                  render={({ field }) => (
                    <div className='flex items-center gap-2'>
                      <span className="text-sm text-default-600 after:ml-0.5 after:text-red-500 after:content-['*']">
                        {t('reviews.form.rating.label')}
                      </span>
                      <ReactStars
                        half={false}
                        onChange={field.onChange}
                        size={20}
                        value={field.value}
                      />
                    </div>
                  )}
                />
                <Button
                  className='mb-4'
                  color='primary'
                  fullWidth
                  isLoading={isLoading}
                  type='submit'
                >
                  {t('reviews.form.submit')}
                </Button>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export type { ReviewFormProps };
export { ReviewForm };
