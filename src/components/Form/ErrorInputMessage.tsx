import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message?: string;
  alertIcon: boolean;
}

export default function ErrorInputMessage({
  message,
  alertIcon,
}: ErrorMessageProps) {
  const { t, i18n } = useTranslation();

  return (
    <span 
      className="flex items-center gap-2 font-roboto font-medium text-[#ff5252] text-xs mt-2 transition-all animate-animeLeft"
      data-test="ErrorInputMessage"
    >
      {alertIcon && <FontAwesomeIcon icon={faTriangleExclamation} />}
      {message ? message : t('required')}
    </span>
  );
}
