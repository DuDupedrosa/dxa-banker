'use client';

import ButtonChangeLanguage from '@/components/Translate/ButtonChangeLanguage';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function notFoundPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  return (
    <div className="h-screen bg-dark w-full flex flex-col items-center justify-center">
      <ButtonChangeLanguage defaultLanguage={'pt'} />
      <h1 className="font-roboto text-[150px] font-bold text-purple-800">
        404
      </h1>
      <p className="font-roboto text-xl font-semibold text-light max-w-[420px] text-center">
        {t('page_not_found')}
      </p>
      <Button
        onClick={() => router.push('/auth')}
        className="bg-purple-800 font-roboto text-2xl mt-5 text-light p-6 min-w-[180px] transition-all hover:opacity-75"
      >
        {t('go_back')}
      </Button>
    </div>
  );
}
