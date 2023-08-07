import { getCssStyleVariable } from '@/helper/methods/style/getCssStyleVariable';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface AlertProps {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  handleCloseAlert: () => void;
}

export default function AlertComponent({
  type,
  message,
  handleCloseAlert,
}: AlertProps) {
  const [alertBg, setAlertBg] = React.useState<string>('');

  React.useEffect(() => {
    if (type === 'error') {
      setAlertBg('#ff5252');
    } else if (type === 'warning') {
      setAlertBg('#fb9c00');
    } else if (type === 'success') {
      setAlertBg('#4fca50');
    } else {
      setAlertBg('#2196f3');
    }
  }, []);

  return (
    <>
      {alertBg && alertBg.length && (
        <div
          className="w-full min-h-[56px] animate-animeLeft flex gap-2 font-roboto text-white text-base font-normal rounded-lg p-2 pl-4 pr-4 items-center relative"
          style={{ backgroundColor: alertBg }}
          data-test={`AlertComponent:${type}`}
        >
          {(type === 'error' || type === 'warning') && (
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              fontSize={24}
              width={24}
              color={getCssStyleVariable('--light')}
            />
          )}
          {type === 'success' && (
            <FontAwesomeIcon
              icon={faCircleCheck}
              fontSize={24}
              width={24}
              color={getCssStyleVariable('--light')}
            />
          )}
          {type === 'info' && (
            <FontAwesomeIcon
              icon={faCircleInfo}
              fontSize={24}
              width={24}
              color={getCssStyleVariable('--light')}
            />
          )}
          <p className="pr-4">{message}</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            fontSize={20}
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => handleCloseAlert()}
          />
        </div>
      )}
    </>
  );
}
