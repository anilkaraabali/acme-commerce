import { NextPageWithLayout } from '@/pages/_app';
import { Button, Divider, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';
import { ZodType, z } from 'zod';

import { SignInEmailForm } from '../../components/SignInEmailForm';
import { SignInHeader } from '../../components/SignInHeader';

type FormData = {
  password: string;
};

interface SignInPageProps {
  messages: AbstractIntlMessages;
  referer: string;
}

const SignInPage = (props: SignInPageProps) => {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        callbackUrl: props.referer.includes('signup') ? '/' : props.referer,
        email,
        password: data.password,
      });

      reset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen w-screen flex-col px-5 pb-4'>
      <SignInHeader />
      <div className='flex w-full grow justify-center rounded-xl bg-content2 dark:bg-content1'>
        <div className='w-full overflow-hidden pt-4 lg:flex lg:gap-x-3 lg:pt-0'>
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
                        alt=''
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
                        alt=''
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
                    <SignInEmailForm
                      onVerify={(email) => {
                        setEmail(email);
                        setStep(1);
                      }}
                    />
                  ) : (
                    <Form
                      className='gap-4'
                      onSubmit={handleSubmit(handleFormSubmit)}
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
                                aria-label={t('Auth.password.toggle')}
                                className='focus:outline-none'
                                onClick={togglePasswordVisibility}
                                title={
                                  showPassword
                                    ? t('Auth.password.hide')
                                    : t('Auth.password.show')
                                }
                                type='button'
                              >
                                {showPassword ? (
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
                            type={showPassword ? 'text' : 'password'}
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
          <aside className='relative hidden h-full items-center justify-center md:w-1/2 lg:flex'>
            <Image
              alt='Sign in image'
              fill
              priority
              src='/images/auth/signin-wk10-16x9.avif'
              style={{ objectFit: 'cover' }}
            />
            <div className='absolute left-1/4 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-5xl uppercase text-white'>
              Acme
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export type { SignInPageProps };
export default SignInPage;

SignInPage.getLayout = (page: NextPageWithLayout) => page;
