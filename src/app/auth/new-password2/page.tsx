'use client';

import React from 'react';
import NewPasswordComponent from './components/NewPasswordComponent';
import { useSearchParams } from 'next/navigation';

export default function page() {
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState<string>('');

  React.useEffect(() => {
    const getToken = searchParams.get('token');

    if (getToken) {
      setToken(getToken);
    }
  }, []);

  return (
    <>
      <NewPasswordComponent token={token} />
    </>
  );
}
