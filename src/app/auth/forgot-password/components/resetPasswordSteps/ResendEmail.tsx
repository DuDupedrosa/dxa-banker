import React from 'react';
import { useSendEmail } from '../../api/usePostSendEmail';
import AlertComponent from '@/components/AlertComponent';
import { useTranslation } from 'react-i18next';

interface ResendEmailInterface {
  email: string;
}

export default function ResendEmail({ email }: ResendEmailInterface) {
  const resendEmailMutation = useSendEmail();
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation();

  function handleResentEmail() {
    const data = { Email: email };

    if (data.Email && !resendEmailMutation.isLoading) {
      resendEmailMutation.mutate(data);
    }
  }

  // controle da request
  React.useEffect(() => {
    if (resendEmailMutation.isSuccess) {
      setShowAlert(true);
    }
  }, [resendEmailMutation.isSuccess]);

  return (
    <div className="p-0 md:p-5">
      <h2 className="block md:hidden text-2xl font-roboto text-dark mb-2 text-center font-bold">
        {t('pwd_reset')}
      </h2>
      <p className="font-roboto text-center md:text-start text-lg text-[#9c9c9c] tracking-default">
        {t('change_password_email_send_success', { email: email })}
      </p>
      <span className="block mt-12 md:hidden font-roboto text-center md:text-start text-lg text-[#9c9c9c] tracking-default">
        {t('change_password_not_receive_link')}
      </span>
      <span
        onClick={() => handleResentEmail()}
        className={`font-roboto text-base text-center md:text-start font-bold tracking-default text-primary block mt-6 cursor-pointer pt-2 pb-2 underline ${
          resendEmailMutation.isLoading ? 'cursor-wait' : ''
        }`}
      >
        {t('resend_link')}
      </span>

      {showAlert && (
        <div className="mt-5">
          <AlertComponent
            type="success"
            message={t('email_send_success')}
            handleCloseAlert={() => setShowAlert(false)}
          />
        </div>
      )}
      {resendEmailMutation.isError && (
        <AlertComponent
          type="error"
          message={t('an_error_occurred')}
          handleCloseAlert={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
