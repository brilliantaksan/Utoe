"use client";

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#F4EFE9] flex items-center justify-center px-6 py-12">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#8FBFB6',
            colorText: '#3A3A3A',
            colorBackground: '#F7F3EE'
          },
          elements: {
            card: 'rounded-3xl shadow-lg',
            formButtonPrimary: 'rounded-full',
            footerActionLink: 'text-[#8FBFB6]'
          }
        }}
      />
    </div>
  );
}
