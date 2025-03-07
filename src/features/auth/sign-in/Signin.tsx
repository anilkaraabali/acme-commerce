/* eslint-disable no-console */
import { NextPageWithLayout } from '@/pages/_app';
import { Button, Divider, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import LoginSVG from 'public/icons/auth/login.svg';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';
import { ZodType, z } from 'zod';

import { SigninEmailForm } from './SignInEmailForm';
import { SigninHeader } from './SigninHeader';

type FormData = {
  password: string;
};

interface SigninProps {
  messages: AbstractIntlMessages;
}

function Signin() {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const schema: ZodType<FormData> = z.object({
    password: z
      .string()
      .min(8, { message: t('Common.form.password.errorMessage.minLength') }),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        callbackUrl: '/',
        email,
        password: data.password,
      });

      reset();
    } catch (error) {
      console.error('Sign in error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen w-screen flex-col px-5 pb-4'>
      <SigninHeader />
      <div className='flex w-full grow justify-center rounded-xl bg-content2 dark:bg-content1'>
        <div className='h-[calc(100%-50px)] w-full overflow-hidden pt-4 md:pt-12 lg:flex lg:gap-x-3'>
          <div className='flex w-full items-start justify-center px-4 lg:w-1/2 lg:items-center'>
            <div className='min-h-[500px] max-w-[400px]'>
              <div className='flex w-full flex-col items-center justify-center gap-12'>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl font-medium tracking-tight lg:text-4xl'>
                    {t('Auth.signIn.title')}
                  </h1>
                  <p className='mt-2 text-default-500'>
                    {t('Auth.signIn.description')}
                  </p>
                </div>
                <div className='flex w-full flex-col gap-4'>
                  <Button
                    className='bg-background'
                    fullWidth
                    size='lg'
                    startContent={
                      <Image
                        alt='Continue with Google'
                        height={24}
                        src='/icons/socials/google.svg'
                        width={24}
                      />
                    }
                    variant='bordered'
                  >
                    {t('Auth.signIn.cta.google')}
                  </Button>
                  <Button
                    className='bg-background'
                    fullWidth
                    size='lg'
                    startContent={
                      <Image
                        alt='Continue with Facebook'
                        height={24}
                        src='/icons/socials/facebook.svg'
                        width={24}
                      />
                    }
                    variant='bordered'
                  >
                    {t('Auth.signIn.cta.facebook')}
                  </Button>
                  <Divider className='my-4' />
                  {step === 0 ? (
                    <SigninEmailForm
                      onVerify={(email) => {
                        setStep(1);
                        setEmail(email);
                      }}
                    />
                  ) : (
                    <Form
                      className='gap-4'
                      onSubmit={handleSubmit(onSubmit)}
                      validationBehavior='aria'
                    >
                      <Controller
                        control={control}
                        name='password'
                        render={({ field }) => (
                          <Input
                            {...field}
                            classNames={{
                              inputWrapper: 'bg-background',
                            }}
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
                      <Button
                        color='primary'
                        fullWidth
                        isLoading={isLoading}
                        size='lg'
                        type='submit'
                        variant='shadow'
                      >
                        {t('Auth.signIn.cta.submit')}
                      </Button>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <aside className='relative hidden items-center justify-center md:w-1/2 lg:flex'>
            <div className='z-10 p-4'>
              <LoginSVG />
            </div>
            <div className='absolute inset-x-0 overflow-hidden'>
              <svg
                fill='none'
                height='600'
                viewBox='0 0 704 600'
                width='100%'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect fill='#ECB462' height='600' rx='150' width='996' />
              </svg>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export type { SigninProps };
export default Signin;

Signin.getLayout = (page: NextPageWithLayout) => page;
