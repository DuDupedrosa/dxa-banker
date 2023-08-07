'use client';

import ButtonChangeLanguage from '@/components/Translate/ButtonChangeLanguage';
import React from 'react';
import { useGetCompanies } from './api/useGetCompanies';

export default function page() {
  const getCompaniesMutation = useGetCompanies();

  return (
    <div className="bg-primary h-screen">
      componente de dashboard
      {getCompaniesMutation.data && JSON.stringify(getCompaniesMutation.data)}
    </div>
  );
}
