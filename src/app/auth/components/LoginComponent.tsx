'use client';

import React from 'react';
import Image from 'next/image';
import DxaInvestLogo from '@/assets/images/DXA_Invest-logo_black.png';
import DxaInvestLogoMobile from '@/assets/images/DXA_Invest-logo.png';
import Link from 'next/link';
import SubmitButton from '@/components/Form/SubmitButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../api/usePostLogin';
import { useRouter } from 'next/navigation';
import ErrorInputMessage from '@/components/Form/ErrorInputMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AlertComponent from '@/components/AlertComponent';
import { errorStatusEnum } from '@/helper/enums/ErrorStatusEnum';
import { regexpToEmail } from '@/helper/regexp/regexp';
import { useTranslation } from 'react-i18next';
import ButtonChangeLanguage from '@/components/Translate/ButtonChangeLanguage';
import { getCssStyleVariable } from '@/helper/methods/style/getCssStyleVariable';
import { alertDefaultToast } from '@/components/Toast/DefaultToasts';
import Error from 'next/error';

interface UserLoginInterface {
  Email: string;
  UserPassword: string;
}

export default function LoginComponent() {
  const router = useRouter();
  const loginUserMutation = useLogin();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showAlertError, setShowAlertError] = React.useState<boolean>(false);
  const [alertErrorMessage, setAlertErrorMessage] = React.useState<string>('');
  const [checkEmail, setCheckEmail] = React.useState<boolean>(true);
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserLoginInterface>();

  const onSubmit: SubmitHandler<UserLoginInterface> = (data) => {
    loginUserMutation.mutate(data);
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function cleanForm() {
    setValue('Email', '');
    setValue('UserPassword', '');
  }

  function handleCheckEmail(e: any) {
    let regexp = regexpToEmail;
    let emailIsValid = regexp.test(e.target.value);

    if (emailIsValid) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }

  function handleChangeCheckEmail() {
    if (!checkEmail) {
      setCheckEmail(true);
    }
  }

  // controle da request
  React.useEffect(() => {
    if (loginUserMutation.isSuccess) {
      const user = JSON.stringify(loginUserMutation.data.user);

      localStorage.setItem('user', user);
      localStorage.setItem('token', loginUserMutation.data.token);
      localStorage.setItem('expires', loginUserMutation.data.expires);
      localStorage.setItem('signed_nda', loginUserMutation.data.signed_nda);
      cleanForm();
      router.push('/dashboard');
    }
  }, [loginUserMutation.isSuccess]);

  // controle se tiver token fazer o login direto
  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/dashboard');
    }
  });

  React.useEffect(() => {
    if (loginUserMutation.isError) {
      const loginError: Error = loginUserMutation.error as Error;

      if ('response' in loginError) {
        const responseWithStatus = loginError.response as { status: number };

        if (typeof responseWithStatus.status !== 'undefined') {
          if (responseWithStatus.status === errorStatusEnum.UNAUTHORIZED) {
            setShowAlertError(true);
            setAlertErrorMessage('Email ou senha incorretos');
          } else {
            setShowAlertError(true);
            setAlertErrorMessage('Ocorreu um erro, peça ajuda ao suporte');
          }
        }
      }

      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      localStorage.removeItem('user');
      localStorage.removeItem('signed_nda');
      cleanForm();
    }
  }, [loginUserMutation.isError]);

  // lógica para mostrar o toast de unauthorized quando der 401 em alguma request e ocorrer o redirect para login
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const unauthorized = localStorage.getItem('unauthorized');
      if (unauthorized === 'true') {
        alertDefaultToast(t('login_required'));
        localStorage.removeItem('unauthorized');
      }
    }
  }, []);

  return (
    <section className="w-full min-h-screen bg-dark  relative">
      {/* button geral de idioma */}
      {/* <ButtonChangeLanguage defaultLanguage={lang ? lang : ''} /> */}
      <div className="flex items-center justify-center lg:items-stretch lg:gap-12 lg:justify-between">
        <div className="bg-primary w-[50%] h-screen hidden lg:grid place-items-center">
          <Image src={DxaInvestLogo} alt="Dxa-logo" className="" />
        </div>
        <div className="lg:pr-[15%] pl-5 pr-5 lg:pl-0 flex flex-col justify-center items-center mt-12 h-screen lg:h-[initial]">
          <div>
            <Image
              src={DxaInvestLogoMobile}
              alt="Dxa-logo"
              className="max-w-[320px] mb-12 lg:hidden block"
            />
            <h2 className="text-4xl font-black tracking-default text-white mb-2">
              {t('welcome_dxa_login')}
            </h2>
            <p className="text-white text-lg tracking-default mb-2">
              {t('welcome_dxa_login_content')}
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:min-w-[506px]"
            >
              <div className="grid gap-8">
                <div>
                  <label
                    htmlFor="email"
                    className="text-[#9C9C9C] text-base tracking-default mb-2 block"
                    onBlur={(e) => handleCheckEmail(e)}
                    onChange={handleChangeCheckEmail}
                  >
                    {t('email')}
                    <input
                      type="email"
                      id="email"
                      className="bg-white rounded pl-2 mt-2 pr-2 h-12 text-sm text-[#9C9C9C] tracking-default w-full outline-none"
                      data-test="LoginComponent:Email"
                      {...register('Email', { required: true })}
                    />
                    {errors.Email && <ErrorInputMessage alertIcon={true} />}
                    {!checkEmail && (
                      <ErrorInputMessage
                        alertIcon={true}
                        message={t('format_invalid')}
                      />
                    )}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-[#9C9C9C] text-base tracking-default mb-2 block"
                  >
                    {t('password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="bg-white rounded pl-2 pr-2 h-12 text-sm text-[#9C9C9C] tracking-default w-full outline-none"
                      data-test="LoginComponent:Password"
                      {...register('UserPassword', { required: true })}
                    />
                    {!showPassword && (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        color="#9c9c9c"
                        width="20px"
                        className="absolute right-5 top-4 cursor-pointer"
                        onClick={handleShowPassword}
                        data-test="LoginComponent:ShowPassword"
                      />
                    )}
                    {showPassword && (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="absolute right-5 top-4 cursor-pointer"
                        color="#9c9c9c"
                        onClick={handleShowPassword}
                        data-test="LoginComponent:HidePassword"
                      />
                    )}
                    {errors.UserPassword && (
                      <ErrorInputMessage
                        alertIcon={true}
                        data-test="LoginComponent:ErrorPassword"
                      />
                    )}
                  </div>
                </div>
                {showAlertError && (
                  <AlertComponent
                    type="error"
                    message={alertErrorMessage}
                    handleCloseAlert={() => setShowAlertError(false)}
                  />
                )}
                <Link
                  href={'/auth/forgot-password'}
                  className="block font-roboto text-sm font-bold text-primary tracking-default underline max-w-max pt-2 pb-2"
                  data-test="LoginComponent:LinkForgotPassword"
                >
                  {t('forgot_pwd')}
                </Link>
              </div>
              <div className="mt-16">
                <SubmitButton
                  bg={getCssStyleVariable('--primary-color')}
                  text={t('access_plataform')}
                  textColor={getCssStyleVariable('--light')}
                  textSize="24px"
                  rounded="16px"
                  loading={loginUserMutation.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
