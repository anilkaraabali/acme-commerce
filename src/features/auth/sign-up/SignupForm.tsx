/* eslint-disable no-console */
import { Alert, Button, Checkbox, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';
import { ZodType, z } from 'zod';

type FormData = {
  email: string;
  name: string;
  password: string;
  terms: boolean;
};

const SignupForm = () => {
  const t = useTranslations();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const schema: ZodType<FormData> = z.object({
    email: z
      .string()
      .min(1, { message: t('Common.form.required') })
      .email(t('Common.form.email.errorMessage')),
    name: z.string().min(2, { message: t('Common.form.name.errorMessage') }),
    password: z
      .string()
      .min(8, { message: t('Common.form.password.errorMessage.minLength') }),
    terms: z.boolean().refine((value) => value, {
      message: t('Auth.signUp.terms.required'),
    }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },
    resolver: zodResolver(schema),
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');

      return;
    }

    const token = await executeRecaptcha('signUp');

    console.log('token:', token);

    return token;
  }, [executeRecaptcha]);

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        await handleReCaptchaVerify();

        const response = await fetch('/api/auth/signup', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const result = await response.json();

        if (response.ok) {
          await signIn('credentials', {
            callbackUrl: '/',
            email: data.email,
            password: data.password,
          });
        } else {
          setErrorMessage(result.error);
        }

        reset();
      } catch (err) {
        console.error('Sign up error', err);
      } finally {
        setIsLoading(false);
      }
    },
    [handleReCaptchaVerify, reset]
  );

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <div className='flex flex-col gap-4'>
      {errorMessage && (
        <Alert
          classNames={{
            base: 'max-w-64',
          }}
          color='danger'
          description={errorMessage}
        />
      )}
      <Form
        className='max-w-64 gap-4'
        onSubmit={handleSubmit(onSubmit)}
        validationBehavior='aria'
      >
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <Input
              {...field}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name?.message}
              isRequired
              placeholder={t('Common.form.name.placeholder')}
              size='lg'
              type='text'
              variant='faded'
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <Input
              {...field}
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
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <Input
              {...field}
              endContent={
                <button
                  aria-label='toggle password visibility'
                  className='focus:outline-none'
                  onClick={toggleVisibility}
                  type='button'
                >
                  {isVisible ? (
                    <LiaEyeSlash
                      className='pointer-events-none text-default-400'
                      size={24}
                    />
                  ) : (
                    <LiaEyeSolid
                      className='pointer-events-none text-default-400'
                      size={24}
                    />
                  )}
                </button>
              }
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password?.message}
              isRequired
              placeholder={t('Common.form.password.placeholder')}
              size='lg'
              type={isVisible ? 'text' : 'password'}
              variant='faded'
            />
          )}
        />
        <Controller
          control={control}
          name='terms'
          render={({ field }) => (
            <Checkbox
              {...field}
              name='terms'
              size='sm'
              value={field.value.toString()}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: t.raw('Auth.signUp.terms.label'),
                }}
              />
            </Checkbox>
          )}
        />
        <Button
          color='primary'
          fullWidth
          isLoading={isLoading}
          size='lg'
          type='submit'
          variant='shadow'
        >
          {t('Auth.signUp.cta.createAccount')}
        </Button>
        <div
          className='mt-7 text-xs text-default-400'
          dangerouslySetInnerHTML={{ __html: t.raw('Common.recaptcha.info') }}
        />
      </Form>
    </div>
  );
};

export { SignupForm };
