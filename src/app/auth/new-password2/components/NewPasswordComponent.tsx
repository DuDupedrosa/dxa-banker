'use client';

import React from 'react';
import Image from 'next/image';
import DxaSingleX from '@/assets/images/dxa_x_I.png';
import DxaStarRight from '@/assets/icons/dxa_start_bg_right.svg';
import { inputStyle } from '../../forgot-password/components/style/InputStyle';
import SubmitButton from '@/components/Form/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSendNewPassword } from '../api/usePostSendNewPassword';
import AlertComponent from '@/components/AlertComponent';
import ErrorInputMessage from '@/components/Form/ErrorInputMessage';
import Link from 'next/link';
import { validatePassword } from '@/helper/methods/password/validatePassword';
import { useValidateToken } from '../api/usePostValidateRouterToken';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getCssStyleVariable } from '@/helper/methods/style/getCssStyleVariable';

interface NewPasswordInterface {
  NewPassword: string;
  UserId: string | null;
  NewCode: string;
  ConfirmNewPassword: string;
}

interface NewPasswordProps {
  token: string;
}

function NewPasswordComponent({ token }: NewPasswordProps) {
  // hooks
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] =
    React.useState<boolean>(false);
  const [showAlertError, setShowAlertError] = React.useState<boolean>(false);
  const [samePassword, setSamePassword] = React.useState<boolean>(true);
  const [inValidToken, setInvalidToken] = React.useState<boolean>(false);
  const [alertErrorMessage, setAlertErrorMessage] = React.useState<string>('');
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // mutations
  const sendNewPasswordMutation = useSendNewPassword();
  const validateTokenMutation = useValidateToken();

  // primeira requisição do componente para validar se o token passado é válido ou não
  React.useEffect(() => {
    const payload = {
      UserId: null,
      NewCode: token,
    };

    validateTokenMutation.mutate(payload);
  }, [token]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewPasswordInterface>();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const onSubmit: SubmitHandler<NewPasswordInterface> = (data) => {
    const payload = {
      NewPassword: data.NewPassword,
      UserId: null,
      NewCode: token,
    };

    sendNewPasswordMutation.mutate(payload);
  };

  function checkIsTheSamePassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      setSamePassword(false);
    } else {
      setSamePassword(true);
    }
  }

  function handleConfirmPassword() {
    const newPassword = getValues('NewPassword');
    const confirmNewPassword = getValues('ConfirmNewPassword');

    checkIsTheSamePassword(newPassword, confirmNewPassword);
  }

  // controle das requests
  React.useEffect(() => {
    if (sendNewPasswordMutation.isSuccess) {
      setShowAlertSuccess(true);
      setValue('NewPassword', '');
      setValue('ConfirmNewPassword', '');
    }
  }, [sendNewPasswordMutation.isSuccess]);

  React.useEffect(() => {
    if (sendNewPasswordMutation.isError) {
      setShowAlertError(true);
    }
  }, [sendNewPasswordMutation.isError]);

  React.useEffect(() => {
    if (validateTokenMutation.isError) {
      setInvalidToken(true);
      setShowAlertError(true);
      setAlertErrorMessage('Link inválido');

      setTimeout(() => {
        router.push('/auth/forgot-password');
      }, 2000);
    }
  }, [validateTokenMutation.isError]);

  React.useEffect(() => {
    if (validateTokenMutation.isSuccess) {
      setInvalidToken(false);
      setShowAlertError(false);
      setAlertErrorMessage('');
    }
  }, [validateTokenMutation.isSuccess]);

  return (
    <div className="w-full h-screen bg-background">
      <div className="h-screen grid md:place-items-center pt-12 gap-0 md:pl-5 md:pr-5">
        <div className="flex flex-col md:flex-row relative">
          <div className="absolute hidden md:block text-center md:text-start -top-24">
            <h2 className="font-roboto text-4xl font-bold text-dark tracking-default">
              {t('pwd_reset')}
            </h2>
            <span className="font-roboto hidden md:block text-lg text-dark mt-6 font-extrabold tracking-default">
              {t('alpha_register_step_count_react', { step: 3, totalSteps: 3 })}
            </span>
          </div>
          <div className="md:w-[500px] lg:w-[720px] xl:w-[820px] h-[540px] bg-background md:bg-white">
            {/* step */}
            <div
              className={`bg-primary h-[6px] rounded-lg hidden md:block w-fu;;`}
            />
            <div className="p-5 h-full">
              {/* barra de progresso dos steps */}
              <span className="block md:hidden text-dark text-2xl font-bold tracking-default mb-2 text-center">
                {t('pwd_reset')}
              </span>
              <h2 className="font-roboto text-lg text-center md:text-start tracking-default text-[#9C9C9C] mb-8">
                {t('enter_confirm_new_pwd')}
              </h2>
              <form
                className="relative h-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label
                  htmlFor="password"
                  className="font-roboto w-full md:max-w-[320px] text-base tracking-default text-[#9C9C9C] block mb-8 relative"
                >
                  {t('new_password')}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`${inputStyle}`}
                    {...register('NewPassword', {
                      required: true,
                      validate: (value) => validatePassword(value),
                    })}
                  />
                  {!showPassword && (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      color="#9c9c9c"
                      width="20px"
                      className="absolute right-5 top-8 cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                  {showPassword && (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="absolute right-5 top-8 cursor-pointer"
                      color="#9c9c9c"
                      onClick={handleShowPassword}
                    />
                  )}
                  {errors.NewPassword && (
                    <ErrorInputMessage
                      alertIcon={true}
                      message={errors.NewPassword.message}
                    />
                  )}
                </label>
                <label
                  onChange={handleConfirmPassword}
                  htmlFor="confirmPassword"
                  className="font-roboto w-full md:max-w-[320px] text-base tracking-default text-[#9C9C9C] block mb-2 relative"
                >
                  {t('confirm_new_password')}
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`${inputStyle}`}
                    {...register('ConfirmNewPassword', {
                      required: true,
                      validate: (value) => validatePassword(value),
                    })}
                  />
                  {!showConfirmPassword && (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      color="#9c9c9c"
                      width="20px"
                      className="absolute right-5 top-8 cursor-pointer"
                      onClick={handleShowConfirmPassword}
                    />
                  )}
                  {showConfirmPassword && (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="absolute right-5 top-8 cursor-pointer"
                      color="#9c9c9c"
                      onClick={handleShowConfirmPassword}
                    />
                  )}
                  {errors.ConfirmNewPassword && (
                    <ErrorInputMessage
                      alertIcon={true}
                      message={errors.ConfirmNewPassword.message}
                    />
                  )}
                </label>
                {!samePassword && (
                  <ErrorInputMessage
                    message={t('pswds_dnt_match')}
                    alertIcon={true}
                  />
                )}
                {/* desktop button */}
                {!sendNewPasswordMutation.isSuccess && (
                  <div className="w-full md:block hidden self-end md:max-w-[312px] md:mt-[initial] md:absolute md:right-8 bottom-0 md:bottom-16">
                    <SubmitButton
                      bg={getCssStyleVariable('--primary-color')}
                      text={t('pwd_reset')}
                      textColor={getCssStyleVariable('--light')}
                      textSize="24px"
                      loading={
                        sendNewPasswordMutation.isLoading ||
                        validateTokenMutation.isLoading
                      }
                    />
                  </div>
                )}
                {/* desktop alert success */}
                <div className="mt-8 hidden md:block">
                  {showAlertSuccess && (
                    <AlertComponent
                      type="success"
                      handleCloseAlert={() => setShowAlertSuccess(false)}
                      message={t('change_pwd_success_2')}
                    />
                  )}
                </div>
                <div className="mt-8 hidden md:block mb-4">
                  {showAlertError && (
                    <AlertComponent
                      type="error"
                      handleCloseAlert={() => setShowAlertError(false)}
                      message={
                        alertErrorMessage
                          ? alertErrorMessage
                          : t('an_error_occurred')
                      }
                    />
                  )}
                </div>
                {sendNewPasswordMutation.isSuccess && (
                  <Link
                    href={'/auth'}
                    className={`font-roboto animate-animeLeft md:block text-2xl text-center md:text-start font-bold tracking-default text-primary hidden mt-6 cursor-pointer pt-2 pb-2 underline mb-4`}
                  >
                    {t('login_dxa')}
                  </Link>
                )}

                <ul className="pl-5 grid gap-2">
                  <li className="font-roboto text-sm font-norma text-[#9C9C9C] tracking-default list-disc">
                    {t('password_rule_4')}
                  </li>
                  <li className="font-roboto text-sm font-norma text-[#9C9C9C] tracking-default list-disc">
                    {t('password_rule_3')}
                  </li>
                  <li className="font-roboto text-sm font-norma text-[#9C9C9C] tracking-default list-disc">
                    {t('password_rule_2')}
                  </li>
                  <li className="font-roboto text-sm font-norma text-[#9C9C9C] tracking-default list-disc">
                    {t('password_rule_1')}
                  </li>
                </ul>

                {/* componentes mobile */}
                <div className="mt-8 block md:hidden">
                  {showAlertSuccess && (
                    <AlertComponent
                      type="success"
                      handleCloseAlert={() => setShowAlertSuccess(false)}
                      message={t('change_pwd_success_2')}
                    />
                  )}
                </div>
                <div className="mt-8 block md:hidden">
                  {showAlertError && (
                    <AlertComponent
                      type="error"
                      handleCloseAlert={() => setShowAlertError(false)}
                      message={t('an_error_occurred')}
                    />
                  )}
                </div>
                {sendNewPasswordMutation.isSuccess && (
                  <Link
                    href={'/auth'}
                    className={`font-roboto animate-animeLeft md:hidden text-xl text-center md:text-start font-bold tracking-default text-primary block mt-6 cursor-pointer pt-2 pb-2 underline `}
                  >
                    {t('login_dxa')}
                  </Link>
                )}

                {!sendNewPasswordMutation.isSuccess && (
                  <div className="w-full md:hidden block self-end mt-[30%] sm:mt-[20%]">
                    <SubmitButton
                      bg={getCssStyleVariable('--primary-color')}
                      text={t('pwd_reset')}
                      textColor={getCssStyleVariable('--light')}
                      textSize="24px"
                      loading={
                        sendNewPasswordMutation.isLoading ||
                        validateTokenMutation.isLoading
                      }
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="hidden md:block md:w-[180px] lg:w-[200px] xl:w-[340px] h-[540px] bg-black relative">
            <div className="absolute right-6 top-6">
              <Image src={DxaSingleX} alt="DXA" />
            </div>
            <div className="absolute bottom-6 right-6 w-[160px] md:w-[120px] lg:w-[160px] xl:w-[initial]">
              <Image src={DxaStarRight} alt="DXA-Star" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPasswordComponent;
