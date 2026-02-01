"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import { Home, Map } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F4EFE9] flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#8FBFB6] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#3A3A3A] mb-4">Page Not Found</h2>
        <p className="text-[#7A7A7A] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
          onClick={() => router.push('/')}
            className="bg-gradient-to-b from-[#9DB8A0] to-[#8FBFB6] text-white px-6 py-3 rounded-full"
          >
            <Home className="w-4 h-4 mr-2 inline" />
            Go Home
          </Button>
          <Button
            onClick={() => navigate('/map')}
            className="bg-white text-[#6F8F88] px-6 py-3 rounded-full border-2 border-black/8"
          >
            <Map className="w-4 h-4 mr-2 inline" />
            Explore Map
          </Button>
        </div>
      </div>
    </div>
  );
}
