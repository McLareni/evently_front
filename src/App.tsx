import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { useGetLikedEventsWithSkip } from './hooks/query/useGetLikedEventsWithSkip';
import { useLogOutAfterTokenExpires } from './hooks/useLogOutAfterTokenExpires';
import { useResetRTKEventsApi } from './hooks/useResetRTKEventsApi';
import router from './routing';

const App: React.FC = () => {
  useLogOutAfterTokenExpires();
  useGetLikedEventsWithSkip();
  useResetRTKEventsApi();

  return <RouterProvider router={router} />;
};

export default App;
