"use client";

import React from 'react';
import { DataProvider } from '../contexts/DataContext';
import { RecruiterProvider } from '../contexts/RecruiterContext';

export default function Providers({ children }) {
  return (
    <DataProvider>
      <RecruiterProvider>{children}</RecruiterProvider>
    </DataProvider>
  );
}
