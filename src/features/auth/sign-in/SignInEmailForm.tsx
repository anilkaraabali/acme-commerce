/* eslint-disable no-console */
import { Button, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

type FormData = {
  email: string;
};

interface SigninEmailFormProps {
  onVerify: (email: string) => void;
}

const SigninEmailForm: FC<SigninEmailFormProps> = ({ onVerify }) => {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const schema: ZodType<FormData> = z.object({
    email: z
      .string()
      .min(1, { message: t('Common.form.required') })
      .email(t('Common.form.email.errorMessage')),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/verify-email', {
        body: JSON.stringify({ email: data.email }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const result = await response.json();

      if (result.exists) {
        onVerify(data.email);
        reset();
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Sign in email existency error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      className='gap-4'
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior='aria'
    >
      <Controller
        control={control}
        name='email'
        render={({ field }) => (
          <Input
            {...field}
            classNames={{
              inputWrapper: 'bg-background',
            }}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            isRequired
            placeholder={t('Common.form.email.placeholder')}
            size='lg'
            type='email'
            variant='faded'
          />
        )}
      />
      {isError && (
        <p className='text-xs text-danger'>
          {t.rich('Auth.signIn.emailNotLinked', {
            signUpLink: (chunks) => (
              <NextLink className='text-current underline' href='/auth/signup'>
                {chunks}
              </NextLink>
            ),
          })}
        </p>
      )}
      <Button
        color='primary'
        fullWidth
        isLoading={isLoading}
        size='lg'
        type='submit'
        variant='shadow'
      >
        {t('Auth.signIn.cta.email')}
      </Button>
    </Form>
  );
};

export type { SigninEmailFormProps };
export { SigninEmailForm };
