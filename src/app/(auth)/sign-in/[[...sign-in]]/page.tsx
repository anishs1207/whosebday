'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/clerk-react';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn && user) {
      // Navigate to the dashboard once the user is signed in
      router.push('/dashboard');
    }
  }, [isSignedIn, user, router]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignIn />
    </div>
  );
}
