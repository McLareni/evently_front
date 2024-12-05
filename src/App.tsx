import React from 'react';
import { RouterProvider } from 'react-router-dom';

import Spinner from './components/ui/Spinner';
import { useGetLikedEventsWithSkip } from './hooks/query/useGetLikedEventsWithSkip';
import { useLazyGetAllEventsQueryWithTrigger } from './hooks/query/useLazyGetAllEventsQueryWithTrigger';
import { useLogOutAfterTokenExpires } from './hooks/useLogOutAfterTokenExpires';
import { useResetRTKEventsApi } from './hooks/useResetRTKEventsApi';
import router from './routing';

const App: React.FC = () => {
  const { isLoading } = useLazyGetAllEventsQueryWithTrigger();
  useLogOutAfterTokenExpires();
  useGetLikedEventsWithSkip();
  useResetRTKEventsApi();

  if (isLoading) return <Spinner />;

  return <RouterProvider router={router} />;
};

export default App;
