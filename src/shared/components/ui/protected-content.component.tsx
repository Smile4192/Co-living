import { useGetUserProfileQuery } from '@/api/auth.api';
import React from 'react';

export default function ProtectedContent({
  children,
  fallback,
}: {
  children: React.ReactElement;
  fallback?: React.ReactElement;
}) {
  const { data } = useGetUserProfileQuery();
  if (Array.isArray(data?.roles) && data?.roles.includes('admin'))
    return <>{children}</>;
  if (fallback) {
    return <>{fallback}</>;
  }
  return <></>;
}
