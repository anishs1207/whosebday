'use client';

import { SignUp, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && isLoaded) {
      // Redirect to dashboard once user is signed up and is loaded
      router.push('/dashboard');
    }
  }, [user, isLoaded, router]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignUp afterSignUpUrl="/sign-up" />
    </div>
  );
}
