import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { getAllEventsLoader } from '@/loaders/getAllEventsLoader';
import Favourite from '@/pages/Favourite';
import Home from '@/pages/Home';
import MyEvent from '@/pages/MyEvent';
import UserProfile from '@/pages/UserProfile';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminUsers from '@/pages/admin/AdminUsers';
import Notifications from '@/pages/admin/Notification';
import PromoEvents from '@/pages/admin/PromoEvents';
import AllEventsPage from '@/pages/events/AllEventsPage';
import CreateEventForm from '@/pages/events/CreateEventPage';
import EventDetails from '@/pages/events/EventDetails';
import Profile from '@/pages/user/Profile';

import { Layout } from '@/components/layout/Layout';

import AdminRouter from './privateRouters/AdminRouter';
import LoginRouter from './privateRouters/LoginRouter';

const NotFound = React.lazy(() => import('../pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: getAllEventsLoader,
      },
      {
        path: 'CreateEvent',
        element: <CreateEventForm />,
      },
      {
        path: 'event/:idEvent',
        element: <EventDetails />,
      },
      {
        element: <LoginRouter />,
        children: [
          { path: 'user_profile', element: <Profile /> },
          { path: 'favourite', element: <Favourite /> },
          { path: 'my-event', element: <MyEvent /> },
          {
            path: 'admin',
            element: <AdminRouter />,
            children: [
              {
                path: 'users',
                element: <AdminUsers />,
              },
              {
                path: 'profile/:userId',
                element: <UserProfile />,
              },
              { path: 'events', element: <AdminEvents /> },
              { path: 'promo-events', element: <PromoEvents /> },
              { path: 'notifications', element: <Notifications /> },
            ],
          },
        ],
      },
      {
        path: 'all_events',
        element: <AllEventsPage />,
        loader: getAllEventsLoader,
      },

      // Later add privat router

      //routes for future components
      // Header routes
      { path: 'popular', element: '' },
      { path: 'organizers', element: '' },
      { path: 'about', element: '' },

      { path: 'nearby', element: '' },
      { path: 'concerts', element: '' },
      { path: 'workshop', element: '' },
      { path: 'stand_up', element: '' },
      { path: 'business_networking', element: '' },
      { path: 'sports_events', element: '' },
      { path: 'another', element: '' },

      { path: 'Kyiv', element: '' },
      { path: 'Odesa', element: '' },
      { path: 'Lviv', element: '' },
      { path: 'Kharkiv', element: '' },
      { path: 'Dnipro', element: '' },

      // Footer routes
      { path: 'office', element: '' },
      { path: 'ReturnsAndPayment', element: '' },
      { path: 'OfferAgreement', element: '' },
      { path: 'PrivacyPolicy', element: '' },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
