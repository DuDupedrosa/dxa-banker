'use client';

import React from 'react';

// como o projeto não tem home  toda vez que cair nessa rota ele vai fazer o redirect para auth
export default function Home() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // window.location.href = '/auth';
    }
  }, []);

  return <div className="h-screen w-ful bg-dark"></div>;
}
