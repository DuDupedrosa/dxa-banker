'use client';

import React from 'react';
import ConfirmEmail from './resetPasswordSteps/ConfirmEmail';
import Image from 'next/image';
import DxaSingleX from '@/assets/images/dxa_x_I.png';
import DxaStarRight from '@/assets/icons/dxa_start_bg_right.svg';
import { regexpToEmail } from '@/helper/regexp/regexp';
import { resetPasswordEnum } from '../enums/resetPasswordEnum';
import ResendEmail from './resetPasswordSteps/ResendEmail';
import ButtonChangeLanguage from '@/components/Translate/ButtonChangeLanguage';
import { useTranslation } from 'react-i18next';

export default function ForgotPasswordComponent() {
  const [resetPasswordStep, setResetPasswordStep] = React.useState<number>(
    resetPasswordEnum.SEND_EMAIL
  );
  const [emailToResetPassword, setEmailToResetPassword] =
    React.useState<string>('');
  const { t, i18n } = useTranslation();

  function handleSendEmailSuccess(email: string) {
    setResetPasswordStep(resetPasswordEnum.RESEND_EMAIL);
    setEmailToResetPassword(email);
  }

  return (
    <div className="w-full h-screen bg-background">
      {/* <ButtonChangeLanguage /> */}
      <div className="h-screen grid md:place-items-center pt-24 md:pt-12 gap-0 pl-5 pr-5">
        <div className="flex flex-col md:flex-row relative">
          <div className="absolute hidden md:block text-center md:text-start -top-24">
            <h2 className="font-roboto text-4xl font-bold text-dark tracking-default">
              {resetPasswordStep === resetPasswordEnum.SEND_EMAIL
                ? t('confirm_email')
                : t('pwd_reset')}
            </h2>
            <span className="font-roboto hidden md:block text-lg text-dark mt-6 font-extrabold tracking-default">
              {resetPasswordStep === resetPasswordEnum.SEND_EMAIL
                ? t('alpha_register_step_count_react', {
                    step: 1,
                    totalSteps: 3,
                  })
                : t('alpha_register_step_count_react', {
                    step: 2,
                    totalSteps: 3,
                  })}
            </span>
          </div>
          <div className="md:w-[500px] lg:w-[720px] xl:w-[820px] h-[540px] bg-background md:bg-white">
            {/* barra de progresso dos steps */}
            <div
              className={`bg-primary h-[6px] rounded-lg hidden md:block ${
                resetPasswordStep === resetPasswordEnum.SEND_EMAIL
                  ? 'w-[35%]'
                  : 'w-[70%]'
              }`}
            />

            {/* primeiro step */}
            {resetPasswordStep === resetPasswordEnum.SEND_EMAIL && (
              <ConfirmEmail
                sendEmailSuccess={(email: string) =>
                  handleSendEmailSuccess(email)
                }
              />
            )}
            {/* segundo step */}
            {resetPasswordStep === resetPasswordEnum.RESEND_EMAIL && (
              <ResendEmail email={emailToResetPassword} />
            )}
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
