import React from 'react';
import ButtonLoadingSpinnerComponent from './ButtonLoadingSpinner';

interface ButtonProps {
  bg: string;
  text: string;
  textColor: string;
  textSize: string;
  rounded?: string;
  loading: boolean;
}

export default function SubmitButton({
  bg,
  text,
  textColor,
  textSize,
  rounded,
  loading,
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      style={{
        backgroundColor: bg,
        color: textColor,
        fontSize: textSize,
        borderRadius: rounded ? rounded : '',
      }}
      className={`w-full h-full  grid place-items-center hover:opacity-80 transition-all rounded tracking-default pt-2 pb-2 ${
        !rounded && 'rounded-lg'
      } ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
      data-test="SubmitButton"
    >
      {!loading && text}
      {loading && <ButtonLoadingSpinnerComponent />}
    </button>
  );
}
