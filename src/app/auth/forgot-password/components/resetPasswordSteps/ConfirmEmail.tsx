'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { inputStyle } from '../style/InputStyle';
import ErrorInputMessage from '@/components/Form/ErrorInputMessage';
import SubmitButton from '@/components/Form/SubmitButton';
import { regexpToEmail } from '@/helper/regexp/regexp';
import AlertComponent from '@/components/AlertComponent';
import { useSendEmail } from '../../api/usePostSendEmail';
import { useTranslation } from 'react-i18next';
import { getCssStyleVariable } from '@/helper/methods/style/getCssStyleVariable';

interface ConfirmEmailInterface {
  Email: string;
}

interface ConfirmEmailProps {
  sendEmailSuccess: (email: string) => void;
}

export default function ConfirmEmail({ sendEmailSuccess }: ConfirmEmailProps) {
  const [checkEmail, setCheckEmail] = React.useState<boolean>(true);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const sendEmailMutation = useSendEmail();
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConfirmEmailInterface>();

  const onSubmit: SubmitHandler<ConfirmEmailInterface> = (data) => {
    sendEmailMutation.mutate(data);
  };

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
    if (sendEmailMutation.isSuccess) {
      const email = getValues('Email');
      sendEmailSuccess(email);
    }
  }, [sendEmailMutation.isSuccess]);

  return (
    <div className="h-full relative md:p-5 w-full bg-background md:bg-[initial] pb-[100px] md:pb-5">
      <h2 className="font-roboto text-dark block md:hidden text-2xl text-center font-bold">
        {t('confirm_email')}
      </h2>
      <span className="block text-center md:text-start font-roboto text-lg text-[#9C9C9C] tracking-default mb-8 mt-2 md:mt-8">
        {t('enter_email')}
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid h-full md:h-[initial]"
      >
        <div>
          <label
            htmlFor="email"
            className="font-roboto w-full md:max-w-[320px] text-base tracking-default text-[#9C9C9C] block mb-2"
            onBlur={(e) => handleCheckEmail(e)}
            onChange={handleChangeCheckEmail}
          >
            {t('email')}
            <input
              type="email"
              id="email"
              {...register('Email', { required: true })}
              className={`${inputStyle}`}
              placeholder="nome@email.com"
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
        {showAlert && (
          <div className="mt-4">
            <AlertComponent
              message={t('an_error_occurred')}
              type="error"
              handleCloseAlert={() => setShowAlert(false)}
            />
          </div>
        )}

        <div className="w-full self-end md:max-w-[312px] md:mt-[initial] md:absolute md:right-8 bottom-0 md:bottom-8">
          <SubmitButton
            bg={getCssStyleVariable('--primary-color')}
            text={t('continue')}
            textColor={getCssStyleVariable('--light')}
            textSize="24px"
            loading={sendEmailMutation.isLoading}
          />
        </div>
      </form>
    </div>
  );
}
